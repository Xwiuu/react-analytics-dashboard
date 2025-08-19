import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.jsx" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  LogIn } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { signIn } = useAuth() 

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      )

      if (response.data.length > 0) {
        const userData = response.data[0] // Pega os dados do usuário da API
        signIn(userData) // <-- MUDANÇA 3: ATUALIZA O CONTEXTO!
        navigate("/dashboard")
      } else {
        alert("Email ou senha inválidos.")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      alert("Ocorreu um erro ao tentar fazer login.")
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Coluna Esquerda */}
      <div className="hidden bg-slate-900 lg:flex lg:items-center lg:justify-center">
        <div className="text-center px-12">
          <h1 className="text-5xl font-bold text-white tracking-tighter">
            AnalyticsDash
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            A plataforma definitiva para visualizar suas métricas e impulsionar
            seu negócio.
          </p>
        </div>
      </div>

      {/* Coluna Direita  */}
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Digite seu email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
          </div>
          <Button type="submit" className="w-full flex items-center gap-2">
            <LogIn size={18} />
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}