"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Target, TrendingUp, Apple, User, BarChart3, ChevronRight, Play, Clock, Flame, Syringe, Bell, Droplet, Activity, Calendar, AlertCircle, Plus, Check, Pause, RotateCcw, X, Weight, Utensils, TrendingDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Goal = "emagrecimento" | "ganho_muscular" | "condicionamento" | null;
type Level = "iniciante" | "intermediario" | "avancado" | null;

interface MedicationRecord {
  date: string;
  weight: number;
  symptoms: string[];
  sideEffects: string[];
  water: number;
  protein: number;
  fiber: number;
  steps: number;
}

interface Workout {
  name: string;
  duration: string;
  calories: number;
  sets: string;
  image: string;
}

interface FoodEntry {
  id: string;
  date: string;
  meal: string;
  food: string;
  calories: number;
}

interface GLP1QuizData {
  hasUsed: boolean | null;
  medication: string;
  currentDose: string;
  frequency: string;
}

export default function FitnessApp() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "questionnaire" | "dashboard">("welcome");
  const [goal, setGoal] = useState<Goal>(null);
  const [level, setLevel] = useState<Level>(null);
  const [userData, setUserData] = useState({
    weight: "",
    height: "",
    age: "",
    name: ""
  });

  // Estados para o quiz GLP-1
  const [showGLP1Quiz, setShowGLP1Quiz] = useState(true);
  const [glp1Data, setGLP1Data] = useState<GLP1QuizData>({
    hasUsed: null,
    medication: "",
    currentDose: "",
    frequency: ""
  });

  // Estados para o cronômetro
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Estados para registro de alimentos
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    { id: "1", date: "2025-01-15", meal: "Café da Manhã", food: "2 ovos mexidos + 1 pão integral", calories: 350 },
    { id: "2", date: "2025-01-15", meal: "Almoço", food: "150g frango + salada + batata doce", calories: 450 },
    { id: "3", date: "2025-01-14", meal: "Café da Manhã", food: "Aveia com banana", calories: 300 },
    { id: "4", date: "2025-01-14", meal: "Jantar", food: "Peixe grelhado + legumes", calories: 380 },
  ]);
  const [newFood, setNewFood] = useState({ meal: "", food: "", calories: "" });
  const [showAddFood, setShowAddFood] = useState(false);

  // Estados para a aba Ozempic
  const [medicationData, setMedicationData] = useState<MedicationRecord[]>([
    {
      date: "2025-01-15",
      weight: 82.5,
      symptoms: ["Náusea leve", "Saciedade"],
      sideEffects: [],
      water: 2.5,
      protein: 120,
      fiber: 25,
      steps: 8500
    },
    {
      date: "2025-01-08",
      weight: 84.0,
      symptoms: ["Saciedade"],
      sideEffects: [],
      water: 2.0,
      protein: 110,
      fiber: 22,
      steps: 7200
    }
  ]);

  const [nextDose, setNextDose] = useState("2025-01-22");
  const [currentMedication, setCurrentMedication] = useState("Ozempic 0.5mg");

  // Efeito para o cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Função para formatar o tempo
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Função para iniciar treino
  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  // Função para pausar/retomar
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // Função para resetar
  const resetTimer = () => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  // Função para finalizar treino
  const finishWorkout = () => {
    setActiveWorkout(null);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  // Funções para registro de alimentos
  const addFoodEntry = () => {
    if (newFood.meal && newFood.food && newFood.calories) {
      const entry: FoodEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        meal: newFood.meal,
        food: newFood.food,
        calories: parseInt(newFood.calories)
      };
      setFoodEntries([entry, ...foodEntries]);
      setNewFood({ meal: "", food: "", calories: "" });
      setShowAddFood(false);
    }
  };

  const deleteFoodEntry = (id: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
  };

  const getTodayCalories = () => {
    const today = new Date().toISOString().split('T')[0];
    return foodEntries
      .filter(entry => entry.date === today)
      .reduce((sum, entry) => sum + entry.calories, 0);
  };

  const getCaloriesForDate = (date: string) => {
    return foodEntries
      .filter(entry => entry.date === date)
      .reduce((sum, entry) => sum + entry.calories, 0);
  };

  const getLast7DaysCalories = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      days.push({
        day: dayName,
        date: dateStr,
        calories: getCaloriesForDate(dateStr)
      });
    }
    return days;
  };

  // Função para finalizar quiz GLP-1
  const completeGLP1Quiz = () => {
    if (glp1Data.hasUsed === false) {
      setShowGLP1Quiz(false);
    } else if (glp1Data.hasUsed === true && glp1Data.medication && glp1Data.currentDose && glp1Data.frequency) {
      setShowGLP1Quiz(false);
      // Atualizar medicamento atual com base nas respostas
      setCurrentMedication(`${glp1Data.medication} - ${glp1Data.currentDose}`);
    }
  };

  // Tela de Boas-vindas
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-3xl shadow-lg">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fit-Forasta
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Seu diário digital de saúde e bem-estar
            </p>
          </div>

          {/* Objetivos */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Escolha seu objetivo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                onClick={() => setGoal("emagrecimento")}
                className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  goal === "emagrecimento"
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400 shadow-lg"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <TrendingDown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Emagrecimento</h3>
                  <p className="text-gray-600 text-sm">Perca peso de forma saudável</p>
                </div>
              </Card>

              <Card
                onClick={() => setGoal("ganho_muscular")}
                className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  goal === "ganho_muscular"
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400 shadow-lg"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Ganho Muscular</h3>
                  <p className="text-gray-600 text-sm">Construa músculos e força</p>
                </div>
              </Card>

              <Card
                onClick={() => setGoal("condicionamento")}
                className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  goal === "condicionamento"
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400 shadow-lg"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Condicionamento</h3>
                  <p className="text-gray-600 text-sm">Melhore sua resistência</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Recursos */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Treinos Personalizados</h3>
                  <p className="text-sm text-gray-600">Planos adaptados às suas necessidades</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Syringe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Acompanhamento GLP-1</h3>
                  <p className="text-sm text-gray-600">Controle de medicamentos e sintomas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Progresso Visual</h3>
                  <p className="text-sm text-gray-600">Monitore suas conquistas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Apple className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Nutrição Inteligente</h3>
                  <p className="text-sm text-gray-600">Recomendações personalizadas</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Botão Continuar */}
          {goal && (
            <div className="text-center">
              <Button
                onClick={() => setCurrentScreen("questionnaire")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Continuar
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Questionário
  if (currentScreen === "questionnaire") {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-100">Vamos personalizar seu plano</h2>
            <p className="text-gray-400">Precisamos de algumas informações sobre você</p>
          </div>

          <Card className="p-8 bg-white border-gray-200 shadow-lg">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 mb-2 block font-medium">Nome</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-gray-700 mb-2 block font-medium">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                  placeholder="Sua idade"
                  className="bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight" className="text-gray-700 mb-2 block font-medium">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={userData.weight}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    placeholder="70"
                    className="bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-gray-700 mb-2 block font-medium">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={userData.height}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    placeholder="175"
                    className="bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700 mb-4 block font-medium">Nível de experiência</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    onClick={() => setLevel("iniciante")}
                    variant={level === "iniciante" ? "default" : "outline"}
                    className={level === "iniciante" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600"}
                  >
                    Iniciante
                  </Button>
                  <Button
                    onClick={() => setLevel("intermediario")}
                    variant={level === "intermediario" ? "default" : "outline"}
                    className={level === "intermediario" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600"}
                  >
                    Intermediário
                  </Button>
                  <Button
                    onClick={() => setLevel("avancado")}
                    variant={level === "avancado" ? "default" : "outline"}
                    className={level === "avancado" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600"}
                  >
                    Avançado
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={() => setCurrentScreen("welcome")}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400"
              >
                Voltar
              </Button>
              <Button
                onClick={() => setCurrentScreen("dashboard")}
                disabled={!userData.name || !userData.age || !userData.weight || !userData.height || !level}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                Criar Meu Plano
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard Principal
  const calculateBMI = () => {
    const heightM = parseFloat(userData.height) / 100;
    const weightKg = parseFloat(userData.weight);
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  const calculateCalories = () => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);
    
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    
    if (goal === "emagrecimento") return Math.round(bmr * 1.2 - 500);
    if (goal === "ganho_muscular") return Math.round(bmr * 1.5 + 300);
    return Math.round(bmr * 1.4);
  };

  const getWorkoutPlan = () => {
    const plans = {
      emagrecimento: {
        iniciante: [
          { name: "Caminhada Rápida", duration: "30 min", calories: 150, sets: "1x", image: "🚶" },
          { name: "Agachamento Livre", duration: "15 min", calories: 80, sets: "3x12", image: "🏋️" },
          { name: "Flexão de Braço", duration: "10 min", calories: 60, sets: "3x8", image: "💪" },
          { name: "Prancha", duration: "5 min", calories: 40, sets: "3x30s", image: "🧘" },
        ],
        intermediario: [
          { name: "Corrida Intervalada", duration: "40 min", calories: 300, sets: "1x", image: "🏃" },
          { name: "Burpees", duration: "15 min", calories: 120, sets: "4x10", image: "🤸" },
          { name: "Mountain Climbers", duration: "15 min", calories: 100, sets: "4x15", image: "⛰️" },
          { name: "Jump Squats", duration: "10 min", calories: 90, sets: "3x12", image: "🦘" },
        ],
        avancado: [
          { name: "HIIT Completo", duration: "45 min", calories: 400, sets: "1x", image: "🔥" },
          { name: "Box Jumps", duration: "20 min", calories: 150, sets: "5x10", image: "📦" },
          { name: "Kettlebell Swings", duration: "15 min", calories: 130, sets: "4x15", image: "🏋️" },
          { name: "Battle Ropes", duration: "10 min", calories: 110, sets: "4x30s", image: "🪢" },
        ]
      },
      ganho_muscular: {
        iniciante: [
          { name: "Supino Reto", duration: "20 min", calories: 100, sets: "3x10", image: "🏋️" },
          { name: "Agachamento Livre", duration: "20 min", calories: 120, sets: "3x10", image: "🦵" },
          { name: "Remada Curvada", duration: "15 min", calories: 90, sets: "3x10", image: "💪" },
          { name: "Desenvolvimento", duration: "15 min", calories: 80, sets: "3x10", image: "🏋️" },
        ],
        intermediario: [
          { name: "Supino Inclinado", duration: "25 min", calories: 130, sets: "4x10", image: "🏋️" },
          { name: "Agachamento Búlgaro", duration: "20 min", calories: 140, sets: "4x10", image: "🦵" },
          { name: "Barra Fixa", duration: "15 min", calories: 110, sets: "4x8", image: "💪" },
          { name: "Levantamento Terra", duration: "25 min", calories: 150, sets: "4x8", image: "🏋️" },
        ],
        avancado: [
          { name: "Supino com Halter", duration: "30 min", calories: 160, sets: "5x8", image: "🏋️" },
          { name: "Agachamento Frontal", duration: "30 min", calories: 180, sets: "5x8", image: "🦵" },
          { name: "Remada Unilateral", duration: "25 min", calories: 140, sets: "5x8", image: "💪" },
          { name: "Clean and Press", duration: "25 min", calories: 170, sets: "4x6", image: "🏋️" },
        ]
      },
      condicionamento: {
        iniciante: [
          { name: "Caminhada", duration: "30 min", calories: 150, sets: "1x", image: "🚶" },
          { name: "Polichinelos", duration: "10 min", calories: 70, sets: "3x20", image: "🤸" },
          { name: "Bicicleta", duration: "20 min", calories: 120, sets: "1x", image: "🚴" },
          { name: "Alongamento", duration: "10 min", calories: 30, sets: "1x", image: "🧘" },
        ],
        intermediario: [
          { name: "Corrida", duration: "35 min", calories: 280, sets: "1x", image: "🏃" },
          { name: "Circuito Funcional", duration: "25 min", calories: 200, sets: "3x", image: "🔄" },
          { name: "Natação", duration: "30 min", calories: 250, sets: "1x", image: "🏊" },
          { name: "Yoga", duration: "20 min", calories: 80, sets: "1x", image: "🧘" },
        ],
        avancado: [
          { name: "Corrida de Longa Distância", duration: "60 min", calories: 500, sets: "1x", image: "🏃" },
          { name: "CrossFit WOD", duration: "45 min", calories: 400, sets: "1x", image: "🏋️" },
          { name: "Spinning", duration: "45 min", calories: 450, sets: "1x", image: "🚴" },
          { name: "Treino Funcional", duration: "40 min", calories: 350, sets: "1x", image: "💪" },
        ]
      }
    };

    return plans[goal!]?.[level!] || [];
  };

  const getNutritionPlan = () => {
    const calories = calculateCalories();
    const protein = Math.round((parseFloat(userData.weight) * 2));
    const carbs = goal === "emagrecimento" ? Math.round(calories * 0.3 / 4) : Math.round(calories * 0.5 / 4);
    const fats = Math.round(calories * 0.25 / 9);

    const meals = {
      emagrecimento: [
        { meal: "Café da Manhã", foods: ["2 ovos mexidos", "1 fatia de pão integral", "1 banana"], calories: 350 },
        { meal: "Lanche da Manhã", foods: ["1 iogurte natural", "10 amêndoas"], calories: 180 },
        { meal: "Almoço", foods: ["150g frango grelhado", "Salada verde", "100g batata doce"], calories: 450 },
        { meal: "Lanche da Tarde", foods: ["1 maçã", "2 col. sopa pasta amendoim"], calories: 220 },
        { meal: "Jantar", foods: ["150g peixe", "Legumes no vapor", "Salada"], calories: 380 },
      ],
      ganho_muscular: [
        { meal: "Café da Manhã", foods: ["3 ovos", "2 fatias pão integral", "Aveia com banana"], calories: 550 },
        { meal: "Lanche da Manhã", foods: ["Shake de whey protein", "1 banana", "Aveia"], calories: 350 },
        { meal: "Almoço", foods: ["200g frango", "150g arroz integral", "Feijão", "Salada"], calories: 700 },
        { meal: "Lanche Pré-Treino", foods: ["Batata doce", "Peito de peru"], calories: 300 },
        { meal: "Jantar", foods: ["200g carne vermelha", "Batata", "Brócolis"], calories: 650 },
        { meal: "Ceia", foods: ["Queijo cottage", "Castanhas"], calories: 250 },
      ],
      condicionamento: [
        { meal: "Café da Manhã", foods: ["Omelete 2 ovos", "Frutas", "Granola"], calories: 400 },
        { meal: "Lanche da Manhã", foods: ["Frutas", "Castanhas"], calories: 200 },
        { meal: "Almoço", foods: ["150g proteína", "Arroz integral", "Legumes"], calories: 550 },
        { meal: "Lanche da Tarde", foods: ["Iogurte", "Frutas"], calories: 250 },
        { meal: "Jantar", foods: ["Sopa de legumes", "Proteína grelhada"], calories: 400 },
      ]
    };

    return { calories, protein, carbs, fats, meals: meals[goal!] || [] };
  };

  const getWeeklyMealPlan = () => {
    const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const nutrition = getNutritionPlan();
    
    return days.map((day, index) => ({
      day,
      meals: nutrition.meals
    }));
  };

  const workouts = getWorkoutPlan();
  const nutrition = getNutritionPlan();
  const bmi = calculateBMI();
  const weeklyPlan = getWeeklyMealPlan();
  const last7Days = getLast7DaysCalories();
  const todayCalories = getTodayCalories();
  const targetCalories = calculateCalories();

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      {/* Header */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-2xl shadow-md">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-100">Fit-Forasta</h1>
                <p className="text-xs text-gray-400">Olá, {userData.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-gray-400">IMC</p>
                <p className="text-sm font-bold text-indigo-400">{bmi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Cronômetro */}
      {activeWorkout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border-gray-200 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{activeWorkout.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={finishWorkout}
                className="hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activeWorkout.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {activeWorkout.calories} cal
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={toggleTimer}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                size="lg"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Retomar
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="border-gray-300 hover:border-gray-400 text-gray-700"
                size="lg"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Séries recomendadas:</p>
              <p className="text-lg font-bold text-indigo-600">{activeWorkout.sets}</p>
            </div>

            <Button
              onClick={finishWorkout}
              variant="outline"
              className="w-full mt-4 border-indigo-400 text-indigo-600 hover:bg-indigo-50"
            >
              Finalizar Treino
            </Button>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs defaultValue="ozempic" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-zinc-900 border border-zinc-800 mb-6 shadow-sm">
            <TabsTrigger value="treinos" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-gray-400">
              <Dumbbell className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger value="nutricao" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-gray-400">
              <Apple className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger value="ozempic" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-gray-400">
              <Syringe className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">GLP-1</span>
            </TabsTrigger>
            <TabsTrigger value="progresso" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-gray-400">
              <BarChart3 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
            <TabsTrigger value="perfil" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-gray-400">
              <User className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Treinos */}
          <TabsContent value="treinos" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Seu Plano de Treino</h3>
                  <p className="text-gray-600">
                    {goal === "emagrecimento" && "Foco em emagrecimento"}
                    {goal === "ganho_muscular" && "Foco em ganho muscular"}
                    {goal === "condicionamento" && "Foco em condicionamento"}
                    {" • Nível: "}
                    {level === "iniciante" && "Iniciante"}
                    {level === "intermediario" && "Intermediário"}
                    {level === "avancado" && "Avançado"}
                  </p>
                </div>
                <div className="bg-indigo-500 p-3 rounded-2xl shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {workouts.map((workout, index) => (
                <Card key={index} className="p-6 bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{workout.image}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2 text-gray-800">{workout.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {workout.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {workout.calories} cal
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-bold">{workout.sets}</span>
                        <Button 
                          size="sm" 
                          className="bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={() => startWorkout(workout)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Nutrição */}
          <TabsContent value="nutricao" className="space-y-6">
            {/* Resumo de Calorias */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Plano Nutricional</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <p className="text-gray-600 text-sm mb-1">Calorias</p>
                  <p className="text-2xl font-bold text-indigo-600">{nutrition.calories}</p>
                  <p className="text-xs text-gray-500">kcal/dia</p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <p className="text-gray-600 text-sm mb-1">Proteínas</p>
                  <p className="text-2xl font-bold text-purple-600">{nutrition.protein}g</p>
                  <p className="text-xs text-gray-500">por dia</p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <p className="text-gray-600 text-sm mb-1">Carboidratos</p>
                  <p className="text-2xl font-bold text-cyan-600">{nutrition.carbs}g</p>
                  <p className="text-xs text-gray-500">por dia</p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <p className="text-gray-600 text-sm mb-1">Gorduras</p>
                  <p className="text-2xl font-bold text-pink-600">{nutrition.fats}g</p>
                  <p className="text-xs text-gray-500">por dia</p>
                </div>
              </div>
            </Card>

            {/* Tabela Semanal */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <h4 className="text-xl font-bold mb-4 text-gray-800">📅 Plano Semanal</h4>
              <div className="space-y-4">
                {weeklyPlan.map((dayPlan, dayIndex) => (
                  <div key={dayIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-indigo-50 px-4 py-3 border-b border-gray-200">
                      <h5 className="font-bold text-gray-800">{dayPlan.day}</h5>
                    </div>
                    <div className="p-4 space-y-3">
                      {dayPlan.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-bold text-sm text-gray-800 mb-1">{meal.meal}</p>
                            <ul className="space-y-0.5">
                              {meal.foods.map((food, foodIndex) => (
                                <li key={foodIndex} className="text-xs text-gray-600 flex items-center gap-2">
                                  <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <span className="text-sm font-bold text-indigo-600">{meal.calories} cal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Registro de Alimentos */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-800">🍽️ Registro de Refeições</h4>
                <Button 
                  onClick={() => setShowAddFood(!showAddFood)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              {/* Formulário de Adicionar */}
              {showAddFood && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-xl space-y-3">
                  <div>
                    <Label className="text-gray-700 text-sm mb-1 block">Refeição</Label>
                    <Input
                      value={newFood.meal}
                      onChange={(e) => setNewFood({ ...newFood, meal: e.target.value })}
                      placeholder="Ex: Café da Manhã"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 text-sm mb-1 block">Alimento</Label>
                    <Input
                      value={newFood.food}
                      onChange={(e) => setNewFood({ ...newFood, food: e.target.value })}
                      placeholder="Ex: 2 ovos mexidos + torrada"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 text-sm mb-1 block">Calorias</Label>
                    <Input
                      type="number"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                      placeholder="Ex: 350"
                      className="bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={addFoodEntry}
                      className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      Salvar
                    </Button>
                    <Button 
                      onClick={() => setShowAddFood(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Calorias de Hoje */}
              <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 font-bold">Calorias de Hoje</p>
                  <p className="text-2xl font-bold text-indigo-600">{todayCalories} / {targetCalories}</p>
                </div>
                <Progress value={(todayCalories / targetCalories) * 100} className="h-3" />
                <p className="text-xs text-gray-600 mt-2">
                  {todayCalories < targetCalories 
                    ? `Faltam ${targetCalories - todayCalories} calorias para atingir sua meta`
                    : `Você atingiu sua meta! 🎉`
                  }
                </p>
              </div>

              {/* Lista de Refeições */}
              <div className="space-y-2">
                {foodEntries.slice(0, 10).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-600">{entry.meal}</span>
                        <span className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p className="text-sm text-gray-800">{entry.food}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-800">{entry.calories} cal</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteFoodEntry(entry.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gráfico de Calorias (Últimos 7 dias) */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <h4 className="text-xl font-bold mb-4 text-gray-800">📊 Consumo Semanal de Calorias</h4>
              <div className="space-y-3">
                {last7Days.map((day, index) => {
                  const percentage = (day.calories / targetCalories) * 100;
                  const isToday = day.date === new Date().toISOString().split('T')[0];
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold ${isToday ? 'text-indigo-600' : 'text-gray-700'}`}>
                          {day.day} {isToday && '(Hoje)'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {day.calories} / {targetCalories} cal
                        </span>
                      </div>
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            percentage >= 100 
                              ? 'bg-gradient-to-r from-green-400 to-green-500' 
                              : percentage >= 80 
                              ? 'bg-gradient-to-r from-indigo-400 to-indigo-500'
                              : 'bg-gradient-to-r from-purple-400 to-purple-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        >
                          <div className="h-full flex items-center justify-end pr-2">
                            {day.calories > 0 && (
                              <span className="text-xs font-bold text-white">
                                {Math.round(percentage)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legenda */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded"></div>
                  <span className="text-gray-600">&lt;80%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded"></div>
                  <span className="text-gray-600">80-99%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
                  <span className="text-gray-600">≥100%</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab Ozempic/GLP-1 */}
          <TabsContent value="ozempic" className="space-y-6">
            {/* Quiz GLP-1 */}
            {showGLP1Quiz && (
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500 p-3 rounded-2xl shadow-md">
                    <Syringe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Informações sobre GLP-1</h3>
                    <p className="text-gray-600 text-sm">Responda algumas perguntas para personalizar seu acompanhamento</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Pergunta 1: Já usou GLP-1? */}
                  <div>
                    <Label className="text-gray-700 mb-3 block font-bold">Você já usou ou usa medicamentos GLP-1?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => setGLP1Data({ ...glp1Data, hasUsed: true })}
                        variant={glp1Data.hasUsed === true ? "default" : "outline"}
                        className={glp1Data.hasUsed === true ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:border-indigo-400"}
                      >
                        Sim
                      </Button>
                      <Button
                        onClick={() => setGLP1Data({ hasUsed: false, medication: "", currentDose: "", frequency: "" })}
                        variant={glp1Data.hasUsed === false ? "default" : "outline"}
                        className={glp1Data.hasUsed === false ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:border-indigo-400"}
                      >
                        Não
                      </Button>
                    </div>
                  </div>

                  {/* Perguntas condicionais se respondeu SIM */}
                  {glp1Data.hasUsed === true && (
                    <>
                      {/* Pergunta 2: Qual medicamento? */}
                      <div>
                        <Label className="text-gray-700 mb-3 block font-bold">Qual medicamento você usa/usou?</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Ozempic", "Wegovy", "Mounjaro", "Zepbound", "Saxenda", "Victoza"].map((med) => (
                            <Button
                              key={med}
                              onClick={() => setGLP1Data({ ...glp1Data, medication: med })}
                              variant={glp1Data.medication === med ? "default" : "outline"}
                              className={glp1Data.medication === med ? "bg-purple-500 hover:bg-purple-600 text-white" : "border-gray-300 text-gray-700 hover:border-purple-400"}
                            >
                              {med}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Pergunta 3: Dose atual */}
                      <div>
                        <Label htmlFor="dose" className="text-gray-700 mb-2 block font-bold">Qual sua dose atual?</Label>
                        <Input
                          id="dose"
                          value={glp1Data.currentDose}
                          onChange={(e) => setGLP1Data({ ...glp1Data, currentDose: e.target.value })}
                          placeholder="Ex: 0.5mg, 1mg, 2.5mg..."
                          className="bg-white border-gray-300 text-gray-800"
                        />
                      </div>

                      {/* Pergunta 4: Frequência */}
                      <div>
                        <Label className="text-gray-700 mb-3 block font-bold">Com que frequência você aplica?</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={() => setGLP1Data({ ...glp1Data, frequency: "Semanal" })}
                            variant={glp1Data.frequency === "Semanal" ? "default" : "outline"}
                            className={glp1Data.frequency === "Semanal" ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "border-gray-300 text-gray-700 hover:border-cyan-400"}
                          >
                            Semanal
                          </Button>
                          <Button
                            onClick={() => setGLP1Data({ ...glp1Data, frequency: "Mensal" })}
                            variant={glp1Data.frequency === "Mensal" ? "default" : "outline"}
                            className={glp1Data.frequency === "Mensal" ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "border-gray-300 text-gray-700 hover:border-cyan-400"}
                          >
                            Mensal
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Botão Continuar */}
                  <Button
                    onClick={completeGLP1Quiz}
                    disabled={
                      glp1Data.hasUsed === null || 
                      (glp1Data.hasUsed === true && (!glp1Data.medication || !glp1Data.currentDose || !glp1Data.frequency))
                    }
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 text-lg"
                  >
                    Continuar para Acompanhamento
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Conteúdo principal da aba (só aparece após completar quiz) */}
            {!showGLP1Quiz && (
              <>
                {/* Aviso de Não Afiliação */}
                <Card className="p-4 bg-amber-50 border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold text-amber-800 mb-1">Aviso de Não Afiliação</p>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        Fit-Forasta é um aplicativo independente, não afiliado, patrocinado ou aprovado por Novo Nordisk, Eli Lilly ou qualquer empresa farmacêutica. 
                        Todas as marcas citadas (Ozempic®, Wegovy®, Mounjaro®, Zepbound®) pertencem aos seus respectivos proprietários e são mencionadas apenas como exemplos 
                        de medicamentos da classe GLP-1, para fins informativos e de compatibilidade funcional.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Header da Aba */}
                <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Acompanhamento GLP-1</h3>
                      <p className="text-gray-600">Seu diário digital de tratamento</p>
                    </div>
                    <div className="bg-indigo-500 p-3 rounded-2xl shadow-md">
                      <Syringe className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">Medicamento Atual</p>
                      <p className="text-lg font-bold text-indigo-600">{currentMedication}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">Próxima Aplicação</p>
                      <p className="text-lg font-bold text-purple-600">{nextDose}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowGLP1Quiz(true)}
                    variant="outline"
                    size="sm"
                    className="mt-4 border-indigo-400 text-indigo-600 hover:bg-indigo-50"
                  >
                    Atualizar Informações
                  </Button>
                </Card>

                {/* Lembrete de Aplicação */}
                <Card className="p-6 bg-white border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-3 rounded-xl">
                        <Bell className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">Lembrete de Aplicação</h4>
                        <p className="text-sm text-gray-600">Configure alertas personalizados</p>
                      </div>
                    </div>
                    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-bold text-gray-800">Próxima dose em 7 dias</p>
                          <p className="text-sm text-gray-600">22 de Janeiro, 2025 - 09:00</p>
                        </div>
                      </div>
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </Card>

                {/* Registro Diário */}
                <Card className="p-6 bg-white border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 text-gray-800">Registro Diário</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-cyan-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-5 h-5 text-cyan-600" />
                        <p className="font-bold text-gray-800">Água</p>
                      </div>
                      <p className="text-2xl font-bold text-cyan-600">2.5L</p>
                      <p className="text-xs text-gray-600">Meta: 3L/dia</p>
                      <Progress value={83} className="h-2 mt-2" />
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <p className="font-bold text-gray-800">Passos</p>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">8,500</p>
                      <p className="text-xs text-gray-600">Meta: 10,000/dia</p>
                      <Progress value={85} className="h-2 mt-2" />
                    </div>

                    <div className="bg-pink-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-5 h-5 text-pink-600" />
                        <p className="font-bold text-gray-800">Proteína</p>
                      </div>
                      <p className="text-2xl font-bold text-pink-600">120g</p>
                      <p className="text-xs text-gray-600">Meta: 140g/dia</p>
                      <Progress value={86} className="h-2 mt-2" />
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Apple className="w-5 h-5 text-green-600" />
                        <p className="font-bold text-gray-800">Fibras</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">25g</p>
                      <p className="text-xs text-gray-600">Meta: 30g/dia</p>
                      <Progress value={83} className="h-2 mt-2" />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Registro de Hoje
                  </Button>
                </Card>

                {/* Histórico de Peso */}
                <Card className="p-6 bg-white border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Weight className="w-6 h-6 text-indigo-600" />
                    <h4 className="font-bold text-lg text-gray-800">Evolução de Peso</h4>
                  </div>
                  <div className="space-y-3">
                    {medicationData.map((record, index) => (
                      <div key={index} className="bg-indigo-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-gray-800">{new Date(record.date).toLocaleDateString('pt-BR')}</p>
                          <p className="text-2xl font-bold text-indigo-600">{record.weight} kg</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Água: <span className="text-cyan-600 font-bold">{record.water}L</span></p>
                            <p className="text-gray-600">Proteína: <span className="text-pink-600 font-bold">{record.protein}g</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600">Fibras: <span className="text-green-600 font-bold">{record.fiber}g</span></p>
                            <p className="text-gray-600">Passos: <span className="text-purple-600 font-bold">{record.steps.toLocaleString()}</span></p>
                          </div>
                        </div>
                        {record.symptoms.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-indigo-200">
                            <p className="text-xs text-gray-600 mb-1">Sintomas:</p>
                            <div className="flex flex-wrap gap-1">
                              {record.symptoms.map((symptom, i) => (
                                <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Sintomas e Efeitos Colaterais */}
                <Card className="p-6 bg-white border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg mb-4 text-gray-800">Registro de Sintomas</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <p className="font-bold mb-2 text-gray-800">Sintomas Comuns</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Saciedade</span>
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Náusea leve</span>
                        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Energia estável</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-gray-300 hover:border-indigo-400 text-gray-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Sintoma
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Tab Progresso */}
          <TabsContent value="progresso" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Seu Progresso</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Treinos Completados</span>
                    <span className="text-sm font-bold text-gray-800">12/20</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Meta de Calorias</span>
                    <span className="text-sm font-bold text-gray-800">1850/2200 kcal</span>
                  </div>
                  <Progress value={84} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Dias Consecutivos</span>
                    <span className="text-sm font-bold text-gray-800">7 dias 🔥</span>
                  </div>
                  <Progress value={100} className="h-3" />
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-white border-gray-200 shadow-sm text-center">
                <div className="text-4xl mb-2">💪</div>
                <p className="text-2xl font-bold text-indigo-600">45</p>
                <p className="text-sm text-gray-600">Treinos Totais</p>
              </Card>
              <Card className="p-6 bg-white border-gray-200 shadow-sm text-center">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-2xl font-bold text-orange-500">12,450</p>
                <p className="text-sm text-gray-600">Calorias Queimadas</p>
              </Card>
              <Card className="p-6 bg-white border-gray-200 shadow-sm text-center">
                <div className="text-4xl mb-2">⏱️</div>
                <p className="text-2xl font-bold text-cyan-600">32h</p>
                <p className="text-sm text-gray-600">Tempo de Treino</p>
              </Card>
            </div>

            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Conquistas Recentes</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <p className="font-bold text-gray-800">Primeira Semana Completa!</p>
                    <p className="text-sm text-gray-600">7 dias consecutivos de treino</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <p className="font-bold text-gray-800">Queimador de Calorias</p>
                    <p className="text-sm text-gray-600">10.000 calorias queimadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                  <div className="text-3xl">💎</div>
                  <div>
                    <p className="font-bold text-gray-800">Dedicação Total</p>
                    <p className="text-sm text-gray-600">30 treinos completados</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab Perfil */}
          <TabsContent value="perfil" className="space-y-6">
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-md">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{userData.name}</h3>
                  <p className="text-gray-600">{userData.age} anos</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-1">Peso</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.weight} kg</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-1">Altura</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.height} cm</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-1">IMC</p>
                  <p className="text-2xl font-bold text-indigo-600">{bmi}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-1">Objetivo</p>
                  <p className="text-lg font-bold text-gray-800">
                    {goal === "emagrecimento" && "Emagrecer"}
                    {goal === "ganho_muscular" && "Ganhar Massa"}
                    {goal === "condicionamento" && "Condicionamento"}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setCurrentScreen("welcome");
                  setGoal(null);
                  setLevel(null);
                  setUserData({ weight: "", height: "", age: "", name: "" });
                }}
                variant="outline"
                className="w-full border-gray-300 hover:border-indigo-400 text-gray-700"
              >
                Refazer Questionário
              </Button>
            </Card>

            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Configurações</h4>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                  Notificações
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                  Privacidade
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                  Ajuda e Suporte
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                  Sobre o Fit-Forasta
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
