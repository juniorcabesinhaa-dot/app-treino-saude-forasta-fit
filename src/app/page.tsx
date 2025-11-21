"use client";

import { Check, Dumbbell, Heart, TrendingUp, Users, Zap, ArrowRight, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
              <Dumbbell className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fit-Forasta
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Seu diário digital de saúde e bem-estar
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Transforme sua jornada de saúde com treinos personalizados, acompanhamento nutricional e controle completo de medicamentos GLP-1
          </p>
          <Link href="/quiz" prefetch={false}>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Comece Agora - Faça o Quiz
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">✨ Descubra o plano perfeito para você em 2 minutos</p>
        </div>

        {/* Social Proof */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">10.000+</div>
            <p className="text-gray-400">Usuários Ativos</p>
          </Card>
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">50.000+</div>
            <p className="text-gray-400">Treinos Completados</p>
          </Card>
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">4.9/5</div>
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-100">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Ferramentas profissionais para transformar sua saúde
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-8 bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 border-indigo-700/50 hover:border-indigo-500 transition-all duration-300 hover:scale-105">
              <div className="bg-indigo-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Treinos Personalizados</h3>
              <p className="text-gray-400">
                Planos de treino adaptados ao seu nível, objetivo e disponibilidade. Do iniciante ao avançado.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/50 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              <div className="bg-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Acompanhamento GLP-1</h3>
              <p className="text-gray-400">
                Controle completo de medicamentos como Ozempic e Mounjaro. Registre doses, sintomas e evolução.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-pink-900/30 to-pink-800/20 border-pink-700/50 hover:border-pink-500 transition-all duration-300 hover:scale-105">
              <div className="bg-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Nutrição Inteligente</h3>
              <p className="text-gray-400">
                Planos nutricionais personalizados com cálculo automático de macros e sugestões de refeições.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border-cyan-700/50 hover:border-cyan-500 transition-all duration-300 hover:scale-105">
              <div className="bg-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Cronômetro Interativo</h3>
              <p className="text-gray-400">
                Acompanhe seus treinos em tempo real com cronômetro integrado e registro de calorias queimadas.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-700/50 hover:border-orange-500 transition-all duration-300 hover:scale-105">
              <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Progresso Visual</h3>
              <p className="text-gray-400">
                Monitore sua evolução com gráficos detalhados, conquistas e estatísticas motivadoras.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-700/50 hover:border-green-500 transition-all duration-300 hover:scale-105">
              <div className="bg-green-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Lembretes Inteligentes</h3>
              <p className="text-gray-400">
                Nunca esqueça suas doses de medicamento ou horários de treino com alertas personalizados.
              </p>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-100">
            O que nossos usuários dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Perdi 12kg em 3 meses! O acompanhamento do Ozempic junto com os treinos fez toda diferença."
              </p>
              <p className="text-gray-400 text-sm">— Maria Silva, 34 anos</p>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Finalmente um app que entende quem usa GLP-1. O controle de sintomas é perfeito!"
              </p>
              <p className="text-gray-400 text-sm">— João Santos, 42 anos</p>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Os treinos personalizados são incríveis! Nunca me senti tão motivada a treinar."
              </p>
              <p className="text-gray-400 text-sm">— Ana Costa, 28 anos</p>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/50 rounded-3xl p-12">
          <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
            Pronto para transformar sua saúde?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Faça nosso quiz rápido e descubra o plano perfeito para seus objetivos
          </p>
          <Link href="/quiz" prefetch={false}>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Começar Meu Quiz Gratuito
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            ✓ Sem cartão de crédito necessário para o quiz<br />
            ✓ Resultados instantâneos personalizados<br />
            ✓ Garantia de satisfação de 30 dias
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>© 2025 Fit-Forasta. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Transforme sua saúde com inteligência e tecnologia.</p>
        </div>
      </div>
    </div>
  );
}
