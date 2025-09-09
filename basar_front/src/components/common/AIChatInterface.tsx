'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Loader2, Bot, User, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Сайн байна уу! Би амьтдын анхны тусламжийн AI туслах. Танд ямар асуулт байна вэ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('хордлого') || lowerQuestion.includes('хор')) {
      return 'Амьтан хордсоны шинж тэмдэг: бөөлжих, суулгах, сул дорой байдал, судас хурдрах, амьсгаах хүндрэл. ЯАРАЛТАЙ эмнэлэгт хүргээрэй! Бөөлгөхгүй байхыг оролдоод шууд эмчид үзүүлнэ.';
    }
    
    if (lowerQuestion.includes('цус') || lowerQuestion.includes('шарх')) {
      return 'Цус алдалтыг зогсоохын тулд: 1) Цэвэр даавуугаар шархыг дарж барина, 2) Амьтныг тайван байлгана, 3) Хэрэв цус их алдаж байвал яаралтай эмнэлэгт хүргэнэ. Шархыг цэвэр усаар угаана.';
    }
    
    if (lowerQuestion.includes('амьсгал') || lowerQuestion.includes('амьсгаа')) {
      return 'Амьсгалын хүндрэл үед: 1) Амны хөндийг чөлөөлнө, 2) Хэлийг гаргаж өгнө, 3) Тайван байлгана, 4) Шууд эмнэлэгт хүргэнэ. Хиймэл амьсгал өгөхийг бүү оролдоно.';
    }
    
    if (lowerQuestion.includes('эмгэг') || lowerQuestion.includes('татах')) {
      return 'Эмгэг татаж байхад: 1) Амьтныг аюулгүй газар тавина, 2) Эргэн тойронд гэмтэй зүйл байгаа эсэхийг шалгана, 3) Эмгэгийн хугацаа, давтамжийг тэмдэглэнэ, 4) Эмгэг дууссаны дараа эмнэлэгт хүргэнэ.';
    }
    
    if (lowerQuestion.includes('вакцин')) {
      return 'Вакцинжилтын хуваарь: Гөлгөр амьтад 6-8 долоо хоногтой, бүрэн насны амьтад жилд 1 удаа. Рабидис, чичрэх өвчин, гепатит зэрэг вакцинууд хэрэгтэй. Эмчтэй зөвлөлдөөрэй.';
    }
    
    if (lowerQuestion.includes('хоол') || lowerQuestion.includes('хооллолт')) {
      return 'Амьтдын хооллолт: Насны бүлэгт тохирсон тэнцвэртэй хоол өгнө. Хүний хоол, шоколад, виноград, сонгино зэрэг хорт хүнсийг өгөхгүй. Цэвэр ус байнга байлгана.';
    }
    
    if (lowerQuestion.includes('алдагдсан') || lowerQuestion.includes('төөрсөн')) {
      return 'Амьтан алдагдсан үед: 1) Орчин тойронд хайна, 2) Орон нутгийн эмнэлэг, shelter-д мэдээлнэ, 3) Соц сүлжээнд зар тавина, 4) Chip-тэй бол холбогдох байгууллагад хандана.';
    }
    
    // Default response
    return 'Таны асуултыг ойлгосонгүй. Та илүү тодорхой асуугаад үзээрэй. Жишээ нь: "амьтан хордсон үед яах вэ?", "цус алдаж байхад хэрхэн туслах вэ?" гэх мэт. Хүнд тохиолдолд шууд эмчид үзүүлээрэй.';
  };

  const quickQuestions = [
    "Амьтан хордсон шинж тэмдэг ямар вэ?",
    "Цус алдаж байхад яах вэ?",
    "Амьсгаах хүндрэл үед яах вэ?",
    "Эмгэг татаж байхад яах вэ?",
    "Муурын вакцины хуваарь",
    "Амьтан алдагдсан үед яах вэ?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Анхны тусламж</h2>
              <p className="text-emerald-100 text-sm">Амьтдын мэргэжлийн зөвлөгөө</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 bg-slate-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-emerald-500 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && (
                      <Bot size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                    )}
                    {message.isUser && (
                      <User size={16} className="text-emerald-100 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isUser ? 'text-emerald-100' : 'text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString('mn-MN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-700 rounded-lg rounded-bl-none px-4 py-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-emerald-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Questions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200">
          <p className="text-sm font-medium text-slate-700 mb-3">🚨 Түгээмэл асуултууд:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                disabled={isLoading}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs hover:bg-red-200 transition-colors border border-red-200 disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Амьтны талаар асуулт асуугаарай..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              variant="primary"
              size="md"
              className="px-6 bg-emerald-500 hover:bg-emerald-600"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </Button>
          </div>
        </div>

        {/* Warning */}
        <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-800">
              <strong>Анхаарах зүйл:</strong> Энэ AI туслах нь зөвхөн анхны тусламжийн мэдээлэл өгч байгаа бөгөөд эмчийн оношлогоо, эмчилгээг орлохгүй. Хүнд тохиолдолд заавал эмчид үзүүлээрэй.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
