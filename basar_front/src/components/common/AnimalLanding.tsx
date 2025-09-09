'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AnimalLanding: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('care');
  const [selectedAnimal, setSelectedAnimal] = useState('all');

  const guides = [
    {
      id: 1,
      title: 'Муурын вакцинжилтын календарь',
      description: 'Муурыг хэзээ, ямар вакцинаар тариулах талаар бүрэн гарын авлага',
      category: 'health',
      animal: 'cat',
      image: '🐱',
      readTime: '5 мин',
      href: '/animals/cat/health/vaccine-schedule'
    },
    {
      id: 2,
      title: 'Нохойн суурь сургалт 7 хоногт',
      description: 'Суух, ирэх, хүлээх зэрэг үндсэн тушаалуудыг хэрхэн заах вэ',
      category: 'training',
      animal: 'dog',
      image: '🐕',
      readTime: '8 мин',
      href: '/animals/dog/training/basic'
    },
    {
      id: 3,
      title: 'Гэрийн анхны тусламжийн багц',
      description: 'Амьтанд зориулсан яаралтай тусламжийн хэрэгслүүд',
      category: 'safety',
      animal: 'all',
      image: '🏥',
      readTime: '4 мин',
      href: '/animals/safety/first-aid-kit'
    },
    {
      id: 4,
      title: 'Гэрийн амьтны хооллолтын зөвлөмж',
      description: 'Насны бүлэг тус бүрийн хоол хүнсний онцлог',
      category: 'care',
      animal: 'all',
      image: '🍽️',
      readTime: '6 мин',
      href: '/animals/care/feeding-guide'
    },
    {
      id: 5,
      title: 'Амьтны арьс арчилгааны үндэс',
      description: 'Усанд оруулах, үс самлах, хумсны арчилгаа',
      category: 'care',
      animal: 'all',
      image: '🛁',
      readTime: '5 мин',
      href: '/animals/care/grooming'
    },
    {
      id: 6,
      title: 'Нийгэмшүүлэх арга барил',
      description: 'Амьтныг хүмүүс болон бусад амьтадтай танилцуулах',
      category: 'training',
      animal: 'all',
      image: '👥',
      readTime: '7 мин',
      href: '/animals/training/socialization'
    }
  ];

  const faqs = [
    {
      question: 'Тэжээвэр амьтныг хэдийд нь эмнэлэгт үзүүлэх ёстой вэ?',
      answer: 'Жилд 1-2 удаа урьдчилан сэргийлэх үзлэгт, мөн вакцинжилтын хуваарийн дагуу үзүүлэх шаардлагатай. Өвчин шинж илэрвэл яаралтай үзүүлнэ.'
    },
    {
      question: 'Амьтныг хэрхэн зөв хооллох вэ?',
      answer: 'Нас, жин, идэвхийн түвшинд тохирсон тэнцвэртэй хоол өгөх. Хүний хоол, шоколад, виноград зэрэг хорт хүнсийг өгөхгүй байх.'
    },
    {
      question: 'Алдагдсан амьтныг хэрхэн хайх вэ?',
      answer: 'Орон нутгийн амьтны эмнэлэг, shelter-д мэдээлэх, соц сүлжээнд зар тавих, орчин тойронд хайх, chip-тэй бол холбогдох байгууллагад хандах.'
    },
    {
      question: 'Амьтан өвдсөн үед анхны тусламжийг хэрхэн үзүүлэх вэ?',
      answer: 'Тайван байлгах, шархыг цэвэрлэх, хэмжээнээс хэтэрсэн цус алдалт, элэгдэл байвал яаралтай эмнэлэгт хүргэх. Эмийг өөрөө өгөхгүй байх.'
    },
    {
      question: 'Амьтныг үрчлүүлэхийг хэрхэн мэдэх вэ?',
      answer: 'Орон нутгийн амьтны хамгааллын байгууллага, shelter-тай холбогдох, онлайн үрчлэлтийн платформыг ашиглах, найз нөхөдтөө мэдээлэх.'
    }
  ];

  const quickActions = [
    {
      title: 'Алдагдсан/Олдсон',
      description: 'Амьтан алдагдсан эсвэл олсон бол энд мэдээл',
      icon: '🔍',
      href: '/animals/lost-found',
      color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
    },
    {
      title: 'Үрчлүүлэх',
      description: 'Гэр бүл хайж байгаа амьтдыг үрчлээрэй',
      icon: '💝',
      href: '/animals/adoption',
      color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
    },
    {
      title: 'Байгууллага хайх',
      description: 'Ойр дэх эмнэлэг, shelter-ыг олоорой',
      icon: '🏥',
      href: '/organizations',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Анхны тусламж',
      description: 'AI туслахаас яаралтай зөвлөгөө аваарай',
      icon: '🆘',
      href: '/first-aid',
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
    }
  ];

  const tabs = [
    { id: 'care', label: 'Арчилгаа', icon: '🛁' },
    { id: 'health', label: 'Эрүүл мэнд', icon: '💉' },
    { id: 'training', label: 'Сургалт', icon: '🎓' },
    { id: 'safety', label: 'Аюулгүй байдал', icon: '🛡️' }
  ];

  const filteredGuides = guides.filter(guide => {
    const categoryMatch = activeTab === 'all' || guide.category === activeTab;
    const animalMatch = selectedAnimal === 'all' || guide.animal === selectedAnimal || guide.animal === 'all';
    return categoryMatch && animalMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section with Search */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              🐾 Амьтдын төв
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Тэжээвэр амьтныхаа эрүүл мэнд, арчилгаа, сургалтын талаар бүх мэдээллийг нэг дороос олоорой
            </p>
            
            {/* Search Box */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                {/* Animal Type Select */}
                <div className="flex-shrink-0">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Амьтны төрөл
                  </label>
                  <select
                    value={selectedAnimal}
                    onChange={(e) => setSelectedAnimal(e.target.value)}
                    className="w-full md:w-48 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="all">🌟 Бүх амьтад</option>
                    <option value="dog">🐕 Нохой</option>
                    <option value="cat">🐱 Муур</option>
                    <option value="bird">🐦 Шувуу</option>
                    <option value="rabbit">🐰 Туулай</option>
                    <option value="fish">🐠 Загас</option>
                    <option value="other">🦎 Бусад</option>
                  </select>
                </div>

                {/* Search Input */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Хайлт
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Жишээ нь: хооллолт, сургалт, эрүүл мэнд..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex-shrink-0 self-end">
                  <Button variant="primary" size="lg" className="px-8 py-3">
                    🔍 Хайх
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Animal Categories */}
          <div className="mb-16">
            {/* Animal Type Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Link href="/animals/dog">
                <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-center transition-all hover:scale-105 hover:shadow-md">
                  <div className="text-3xl mb-2">🐕</div>
                  <h3 className="font-semibold text-blue-800">Нохой</h3>
                </div>
              </Link>
              <Link href="/animals/cat">
                <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50 text-center transition-all hover:scale-105 hover:shadow-md">
                  <div className="text-3xl mb-2">🐱</div>
                  <h3 className="font-semibold text-purple-800">Муур</h3>
                </div>
              </Link>
              <div 
                onClick={() => setSelectedAnimal('bird')}
                className="p-4 rounded-xl border-2 border-sky-200 bg-sky-50 text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <div className="text-3xl mb-2">🐦</div>
                <h3 className="font-semibold text-sky-800">Шувуу</h3>
              </div>
              <div 
                onClick={() => setSelectedAnimal('rabbit')}
                className="p-4 rounded-xl border-2 border-green-200 bg-green-50 text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <div className="text-3xl mb-2">🐰</div>
                <h3 className="font-semibold text-green-800">Туулай</h3>
              </div>
              <div 
                onClick={() => setSelectedAnimal('fish')}
                className="p-4 rounded-xl border-2 border-cyan-200 bg-cyan-50 text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <div className="text-3xl mb-2">🐠</div>
                <h3 className="font-semibold text-cyan-800">Загас</h3>
              </div>
              <div 
                onClick={() => setSelectedAnimal('other')}
                className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50 text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <div className="text-3xl mb-2">🦎</div>
                <h3 className="font-semibold text-amber-800">Бусад</h3>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${action.color}`}>
                    <div className="text-3xl mb-3">{action.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topic Tabs & Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {selectedAnimal === 'all' ? 'Топ гарын авлагууд' : 
               selectedAnimal === 'dog' ? '🐕 Нохойн гарын авлагууд' :
               selectedAnimal === 'cat' ? '🐱 Муурын гарын авлагууд' :
               selectedAnimal === 'bird' ? '🐦 Шувууны гарын авлагууд' :
               selectedAnimal === 'rabbit' ? '🐰 Туулайн гарын авлагууд' :
               selectedAnimal === 'fish' ? '🐠 Загасны гарын авлагууд' :
               '🦎 Бусад амьтдын гарын авлагууд'}
            </h2>
            <p className="text-lg text-slate-600">
              {selectedAnimal === 'all' 
                ? 'Амьтны мэргэжилтнүүдийн зөвлөмжтэй гарын авлагууд'
                : 'Сонгосон амьтдын төрөлд зориулсан тусгай гарын авлагууд'}
            </p>
            {selectedAnimal !== 'all' && (
              <div className="mt-4">
                <button
                  onClick={() => setSelectedAnimal('all')}
                  className="text-emerald-600 hover:text-emerald-700 underline text-sm"
                >
                  ← Бүх амьтдын гарын авлага харах
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌟 Бүгд
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === 'all' ? filteredGuides : filteredGuides).length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Илэрц олдсонгүй
                </h3>
                <p className="text-slate-600 mb-6">
                  {selectedAnimal !== 'all' 
                    ? `${selectedAnimal === 'dog' ? 'Нохой' : selectedAnimal === 'cat' ? 'Муур' : 'Энэ амьтан'}-ны ${activeTab !== 'all' ? 'энэ сэдвийн ' : ''}гарын авлага одоогоор алга байна.`
                    : `${activeTab !== 'all' ? 'Энэ сэдвийн ' : ''}гарын авлага одоогоор алга байна.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {selectedAnimal !== 'all' && (
                    <button
                      onClick={() => setSelectedAnimal('all')}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Бүх амьтдын гарын авлага харах
                    </button>
                  )}
                  {activeTab !== 'all' && (
                    <button
                      onClick={() => setActiveTab('all')}
                      className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Бүх сэдвийн гарын авлага харах
                    </button>
                  )}
                </div>
              </div>
            ) : (
              (activeTab === 'all' ? filteredGuides : filteredGuides).map((guide) => (
                <Link key={guide.id} href={guide.href}>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4">{guide.image}</div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle size={16} />
                        {guide.readTime}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded-full text-xs">
                        {guide.category === 'care' && 'Арчилгаа'}
                        {guide.category === 'health' && 'Эрүүл мэнд'}
                        {guide.category === 'training' && 'Сургалт'}
                        {guide.category === 'safety' && 'Аюулгүй байдал'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 xl:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Түгээмэл асуултууд
            </h2>
            <p className="text-lg text-slate-600">
              Хамгийн олон тавигддаг асуултууд болон хариултууд
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white border border-slate-200 rounded-lg">
                <summary className="p-6 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6 text-slate-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/animals/qa">
              <Button variant="primary" size="lg" className="px-8">
                ❓ Бусад асуулт үзэх
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Organizations Strip */}
      <section className="py-12 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Баталгаажсан байгууллагууд
            </h2>
            <p className="text-slate-600">
              Найдвартай эмнэлэг, дэлгүүр, үйлчилгээ үзүүлэгчид
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-emerald-600" size={24} />
                </div>
                <h4 className="font-medium text-sm text-slate-900 mb-1">
                  Эмнэлэг {index}
                </h4>
                <div className="flex items-center justify-center text-xs text-emerald-600">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/organizations">
              <Button variant="secondary" size="lg" className="px-8">
                🏥 Бүх байгууллага үзэх
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 xl:px-0 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Нийтлэл бичиж, туршлагаа хуваалцаарай
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Та бусад амьтан тэжээгчдэд туслахын тулд өөрийн туршлага, зөвлөмжийг хуваалцаарай
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog/create">
              <Button variant="primary" size="lg" className="px-8">
                ✍️ Блог бичих
              </Button>
            </Link>
            <Link href="/animals/qa">
              <Button variant="secondary" size="lg" className="px-8">
                ❓ Асуулт асуух
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
