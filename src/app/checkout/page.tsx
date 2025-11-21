"use client";

import { useState, Suspense } from "react";
import { ArrowLeft, CreditCard, Shield, Lock, Check, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "mensal";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    mensal: {
      name: "Plano Mensal",
      price: "19,90",
      total: "R$ 19,90",
    },
    trimestral: {
      name: "Plano Trimestral",
      price: "57,90",
      total: "R$ 57,90",
    },
    anual: {
      name: "Plano Anual",
      price: "200,00",
      total: "R$ 200,00",
    },
  };

  const currentPlan = plans[plan as keyof typeof plans] || plans.mensal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;

    // Formatação de CPF
    if (name === "cpf") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }

    // Formatação de número do cartão
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim()
        .substring(0, 19);
    }

    // Formatação de data de validade
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    // Formatação de CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Redireciona para o checkout da Kiwify
    window.open("https://pay.kiwify.com.br/gz6dDlB", "_blank");
    
    // Reseta o estado após um pequeno delay
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  const isFormValid = () => {
    return (
      formData.name.length > 0 &&
      formData.email.includes("@") &&
      formData.cpf.length === 14 &&
      formData.cardNumber.replace(/\s/g, "").length >= 13 &&
      formData.cardName.length > 0 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length >= 3
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/pagamento" prefetch={false}>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Pagamento */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-zinc-900/50 border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gray-100">Dados de Pagamento</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    Informações Pessoais
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="joao@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-gray-300">
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Cartão */}
                <div className="space-y-4 pt-6 border-t border-zinc-800">
                  <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    Dados do Cartão
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-300">
                      Número do Cartão
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-gray-300">
                      Nome no Cartão
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      type="text"
                      placeholder="JOÃO SILVA"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500 uppercase"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-gray-300">
                        Validade
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-gray-300">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 text-gray-100 placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Botão de Pagamento */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || isProcessing}
                  className="w-full py-6 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Confirmar Pagamento
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-800">
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-xs text-gray-400">Pagamento Seguro</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Lock className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-xs text-gray-400">Dados Criptografados</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Check className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-xs text-gray-400">SSL Certificado</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-gray-100">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                  <span className="text-gray-400">Plano:</span>
                  <span className="font-semibold text-gray-100">{currentPlan.name}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-semibold text-gray-100">{currentPlan.total}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-100">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {currentPlan.total}
                  </span>
                </div>
              </div>

              {/* Benefícios */}
              <div className="space-y-3 pt-6 border-t border-zinc-800">
                <p className="text-sm font-semibold text-gray-300 mb-3">Você terá acesso a:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">Treinos personalizados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">Plano nutricional completo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">Acompanhamento GLP-1</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">Suporte especializado</span>
                  </div>
                </div>
              </div>

              {/* Garantia */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                <p className="text-sm text-center text-gray-300">
                  <span className="font-bold text-green-500">🛡️ Garantia de 7 dias</span>
                  <br />
                  <span className="text-xs text-gray-400">
                    Devolução de 100% do valor
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
