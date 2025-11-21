"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o seu objetivo principal?",
    options: [
      "Perder peso",
      "Ganhar massa muscular",
      "Melhorar condicionamento",
      "Manter a saúde"
    ]
  },
  {
    id: 2,
    question: "Qual é o seu nível de experiência com exercícios?",
    options: [
      "Iniciante (nunca treinei)",
      "Intermediário (treino ocasionalmente)",
      "Avançado (treino regularmente)",
      "Atleta (treino profissionalmente)"
    ]
  },
  {
    id: 3,
    question: "Quantos dias por semana você pode treinar?",
    options: [
      "1-2 dias",
      "3-4 dias",
      "5-6 dias",
      "Todos os dias"
    ]
  },
  {
    id: 4,
    question: "Você usa ou planeja usar medicamentos GLP-1?",
    options: [
      "Sim, já uso",
      "Sim, planejo usar",
      "Não, mas tenho interesse",
      "Não"
    ]
  },
  {
    id: 5,
    question: "Qual é a sua prioridade em relação à alimentação?",
    options: [
      "Perder gordura",
      "Ganhar massa muscular",
      "Manter peso atual",
      "Melhorar saúde geral"
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 bg-zinc-900/50 border-zinc-800">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Parabéns! Quiz Completo
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Analisamos suas respostas e preparamos um plano personalizado para você!
            </p>
            
            <div className="bg-zinc-800/50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Seu Plano Recomendado:</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <span>Treinos personalizados {answers[2]?.toLowerCase() || "3-4 dias"} por semana</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <span>Plano nutricional focado em {answers[0]?.toLowerCase() || "seus objetivos"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <span>Nível {answers[1]?.split(" ")[0].toLowerCase() || "intermediário"} de intensidade</span>
                </li>
                {answers[3]?.includes("Sim") && (
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Acompanhamento completo de medicamentos GLP-1</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" prefetch={false}>
                <Button 
                  variant="outline" 
                  className="border-zinc-700 hover:bg-zinc-800 text-gray-300"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Voltar ao Início
                </Button>
              </Link>
              <Link href="/pagamento" prefetch={false}>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                  Começar Meu Plano
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" prefetch={false}>
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-gray-300 mb-4"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Descubra Seu Plano Ideal
          </h1>
          <p className="text-gray-400">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-zinc-900/50 border-zinc-800 mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion] === option
                    ? "border-indigo-500 bg-indigo-500/10 text-gray-100"
                    : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50 text-gray-300 hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {answers[currentQuestion] === option && (
                    <Check className="w-5 h-5 text-indigo-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-gray-300"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Voltar
          </Button>
        )}
      </div>
    </div>
  );
}
