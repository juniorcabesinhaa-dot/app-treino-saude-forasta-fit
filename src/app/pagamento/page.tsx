"use client";

import { useState } from "react";
import { ArrowLeft, Check, CreditCard, Shield, Lock, Zap, Dumbbell, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function PagamentoPage() {
  const [selectedPlan, setSelectedPlan] = useState<"mensal" | "trimestral" | "anual">("mensal");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("cartao");

  const plans = {
    mensal: {
      name: "Plano Mensal",
      price: "19,90",
      period: "/mês",
      total: "R$ 19,90",
      savings: null,
      features: [
        "Acesso completo ao app",
        "Treinos personalizados",
        "Plano nutricional",
        "Acompanhamento GLP-1",
        "Suporte via chat"
      ]
    },
    trimestral: {
      name: "Plano Trimestral",
      price: "19,30",
      period: "/mês",
      total: "R$ 57,90 a cada 3 meses",
      savings: "Economize 3%",
      features: [
        "Tudo do plano mensal",
        "3 meses de acesso garantido",
        "Desconto de 3%",
        "Prioridade no suporte",
        "Relatórios mensais detalhados"
      ]
    },
    anual: {
      name: "Plano Anual",
      price: "16,67",
      period: "/mês",
      total: "R$ 200,00 por ano",
      savings: "Economize 16%",
      features: [
        "Tudo do plano trimestral",
        "12 meses de acesso garantido",
        "Desconto de 16%",
        "Suporte prioritário VIP",
        "Consultoria nutricional mensal",
        "Acesso antecipado a novos recursos"
      ]
    }
  };

  const currentPlan = plans[selectedPlan];

  const handlePayment = () => {
    // Redireciona para o link da Kiwify
    window.location.href = "https://pay.kiwify.com.br/gz6dDlB";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/quiz" prefetch={false}>
            <Button variant="ghost" className="text-gray-400 hover:text-gray-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-2xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-100">Fit-Forasta</span>
          </div>
        </div>

        {/* Plans Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Plano Mensal */}
          <Card
            onClick={() => setSelectedPlan("mensal")}
            className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPlan === "mensal"
                ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500 shadow-lg shadow-indigo-500/20"
                : "bg-zinc-900/50 border-zinc-800 hover:border-indigo-500"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-100">Mensal</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-100">R$ 19,90</span>
                <span className="text-gray-400">/mês</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {plans.mensal.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {selectedPlan === "mensal" && (
              <div className="flex items-center justify-center gap-2 text-green-500 font-semibold">
                <Check className="w-5 h-5" />
                Selecionado
              </div>
            )}
          </Card>

          {/* Plano Trimestral - DESTAQUE */}
          <Card
            onClick={() => setSelectedPlan("trimestral")}
            className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              selectedPlan === "trimestral"
                ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500 shadow-lg shadow-indigo-500/20"
                : "bg-zinc-900/50 border-zinc-800 hover:border-indigo-500"
            }`}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              Mais Popular
            </div>
            <div className="text-center mb-6 mt-2">
              <h3 className="text-2xl font-bold mb-2 text-gray-100">Trimestral</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-100">R$ 19,30</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-green-500 font-semibold mt-2">Economize 3%</p>
            </div>
            <ul className="space-y-3 mb-6">
              {plans.trimestral.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {selectedPlan === "trimestral" && (
              <div className="flex items-center justify-center gap-2 text-green-500 font-semibold">
                <Check className="w-5 h-5" />
                Selecionado
              </div>
            )}
          </Card>

          {/* Plano Anual */}
          <Card
            onClick={() => setSelectedPlan("anual")}
            className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPlan === "anual"
                ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500 shadow-lg shadow-indigo-500/20"
                : "bg-zinc-900/50 border-zinc-800 hover:border-indigo-500"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-100">Anual</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-100">R$ 16,67</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-green-500 font-semibold mt-2">Economize 16%</p>
            </div>
            <ul className="space-y-3 mb-6">
              {plans.anual.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {selectedPlan === "anual" && (
              <div className="flex items-center justify-center gap-2 text-green-500 font-semibold">
                <Check className="w-5 h-5" />
                Selecionado
              </div>
            )}
          </Card>
        </div>

        {/* Payment Method Selection */}
        <Card className="max-w-2xl mx-auto p-8 bg-zinc-900/50 border-zinc-800 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Escolha a forma de pagamento</h2>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Cartão de Crédito */}
            <Card
              onClick={() => setPaymentMethod("cartao")}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                paymentMethod === "cartao"
                  ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "bg-zinc-800/50 border-zinc-700 hover:border-indigo-500"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <CreditCard className="w-12 h-12 text-indigo-500" />
                <div>
                  <h3 className="font-bold text-gray-100 mb-1">Cartão de Crédito</h3>
                  <p className="text-sm text-gray-400">Aprovação instantânea</p>
                </div>
                {paymentMethod === "cartao" && (
                  <div className="flex items-center gap-2 text-green-500 font-semibold text-sm">
                    <Check className="w-4 h-4" />
                    Selecionado
                  </div>
                )}
              </div>
            </Card>

            {/* Pix */}
            <Card
              onClick={() => setPaymentMethod("pix")}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                paymentMethod === "pix"
                  ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "bg-zinc-800/50 border-zinc-700 hover:border-indigo-500"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <QrCode className="w-12 h-12 text-indigo-500" />
                <div>
                  <h3 className="font-bold text-gray-100 mb-1">Pix</h3>
                  <p className="text-sm text-gray-400">Pagamento rápido e seguro</p>
                </div>
                {paymentMethod === "pix" && (
                  <div className="flex items-center gap-2 text-green-500 font-semibold text-sm">
                    <Check className="w-4 h-4" />
                    Selecionado
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-4 mb-6 pt-6 border-t border-zinc-800">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <span className="text-gray-400">Plano selecionado:</span>
              <span className="font-semibold text-gray-100">{currentPlan.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <span className="text-gray-400">Forma de pagamento:</span>
              <span className="font-semibold text-gray-100">
                {paymentMethod === "cartao" ? "Cartão de Crédito" : "Pix"}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <span className="text-gray-400">Valor:</span>
              <span className="font-semibold text-gray-100">R$ {currentPlan.price}{currentPlan.period}</span>
            </div>
            {currentPlan.savings && (
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-gray-400">Economia:</span>
                <span className="font-semibold text-green-500">{currentPlan.savings}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-gray-100">Total:</span>
              <span className="text-2xl font-bold text-gray-100">{currentPlan.total}</span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full py-6 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            {paymentMethod === "cartao" ? (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar com Cartão
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5 mr-2" />
                Pagar com Pix
              </>
            )}
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-800">
            <div className="flex flex-col items-center text-center">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-xs text-gray-400">Pagamento Seguro</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-xs text-gray-400">Dados Protegidos</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-xs text-gray-400">Acesso Imediato</span>
            </div>
          </div>
        </Card>

        {/* Garantia */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-100">
              🛡️ Garantia de 7 dias
            </h3>
            <p className="text-gray-400">
              Não está satisfeito? Devolvemos 100% do seu dinheiro, sem perguntas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
