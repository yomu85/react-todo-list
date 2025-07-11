import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Heart, Star } from "lucide-react"
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(['샘플 아이템 1', '샘플 아이템 2'])

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue])
      setInputValue('')
    }
  }

  const deleteItem = (index: any) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            shadcn/ui 테스트 🚀
          </h1>
          <p className="text-gray-600">버튼과 Input 컴포넌트 예제</p>
        </div>

        {/* 버튼 스타일 예제들 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🎨 Button 스타일 예제
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* 기본 버튼들 */}
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="destructive">삭제 버튼</Button>
            <Button variant="outline">외곽선 버튼</Button>
            <Button variant="ghost">고스트 버튼</Button>
            <Button variant="link">링크 버튼</Button>
          </div>

          {/* 아이콘과 함께 */}
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Heart className="h-4 w-4 mr-2" />
              좋아요
            </Button>
            
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Star className="h-4 w-4 mr-2" />
              즐겨찾기
            </Button>
            
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="h-5 w-5 mr-2" />
              대형 버튼
            </Button>
          </div>
        </div>

        {/* Input과 실시간 기능 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ⚡ Input & 실시간 기능
          </h2>
          
          {/* 아이템 추가 영역 */}
          <div className="flex gap-3">
            <Input
              placeholder="새로운 아이템을 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="flex-1"
            />
            <Button onClick={addItem} className="px-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 아이템 목록 */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-800">{item}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 커스텀 스타일 예제 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🎯 커스텀 스타일 예제
          </h2>
          
          <div className="grid gap-4">
            {/* 네온 효과 버튼 */}
            <Button className="relative bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_#00ffff]">
              네온 효과 버튼 ⚡
            </Button>
            
            {/* 그라데이션 Input */}
            <Input
              placeholder="그라데이션 테두리 Input"
              className="border-2 border-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-border p-[2px] rounded-md"
              style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #ec4899, #8b5cf6) border-box'
              }}
            />
            
            {/* 3D 효과 버튼 */}
            <Button className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl active:scale-95">
              3D 효과 버튼 🚀
            </Button>
          </div>
        </div>

        {/* 상태 표시 */}
        <div className="text-center text-gray-600">
          현재 아이템 개수: <strong>{items.length}</strong>개
        </div>
      </div>
    </div>
  )
}

export default App