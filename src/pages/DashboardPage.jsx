import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const [salesData, setSalesData] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await axios.get("http://localhost:3001/sales")
        setSalesData(response.data)
      } catch (error) {
        console.error("Erro ao buscar dados de vendas:", error)
        alert("Não foi possível carregar os dados de vendas.")
      }
    }
    fetchSalesData()
  }, [])

  const { totalRevenue, totalSales, chartData, pieChartData, filteredData } = useMemo(() => {
    const filtered = salesData.filter(sale => {
      if (filter === 'all') return true;
      const saleDate = new Date(sale.date + 'T00:00:00');
      const today = new Date();
      const limitDate = new Date();
      const daysAgo = filter === '7days' ? 7 : 30;
      limitDate.setDate(today.getDate() - daysAgo);
      return saleDate >= limitDate;
    });

    const revenue = filtered.reduce((total, sale) => total + sale.value, 0)
    const salesCount = filtered.length
    
    const aggregatedData = filtered.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString('pt-BR');
      if (!acc[date]) {
        acc[date] = { date, totalValue: 0 };
      }
      acc[date].totalValue += sale.value;
      return acc;
    }, {});
    
    const sortedChartData = Object.values(aggregatedData).sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateA - dateB;
    });
    
    const categoryData = filtered.reduce((acc, sale) => {
      if (!acc[sale.category]) {
        acc[sale.category] = { name: sale.category, value: 0 };
      }
      acc[sale.category].value += sale.value;
      return acc;
    }, {});

    return { 
      totalRevenue: revenue, 
      totalSales: salesCount, 
      chartData: sortedChartData, 
      pieChartData: Object.values(categoryData),
      filteredData: filtered 
    }
  }, [salesData, filter])

  function handleLogout() {
    signOut()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <header className="flex h-16 items-center justify-between border-b bg-white dark:border-slate-800 dark:bg-slate-900 px-6">
        <h1 className="text-xl font-bold">AnalyticsDash</h1>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{user ? user.email : "Usuário"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Painel Principal</h2>
            <p className="text-muted-foreground">Bem-vindo de volta, {user ? user.email : "usuário"}!</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>Geral</Button>
            <Button variant={filter === '7days' ? 'default' : 'outline'} onClick={() => setFilter('7days')}>Últimos 7 dias</Button>
            <Button variant={filter === '30days' ? 'default' : 'outline'} onClick={() => setFilter('30days')}>Últimos 30 dias</Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSales}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Vendas ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)} />
                  <Line type="monotone" dataKey="totalValue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Faturamento por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes das Vendas</CardTitle>
              <CardDescription>Uma lista detalhada das vendas no período selecionado.</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data da Venda</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{new Date(sale.date + 'T00:00:00').toLocaleDateString()}</TableCell>
                    <TableCell>{sale.category}</TableCell>
                    <TableCell className="text-right">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(sale.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  )
}