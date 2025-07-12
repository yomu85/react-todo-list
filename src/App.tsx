import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import './App.css'

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerAddItem = () => {
    if(!inputValue.trim()) { // 입력값이 비어있거나 공백만 있는 경우 추가하지 않음
      inputRef.current?.focus(); // 입력 후 입력창에 포커스 유지
      return;
    }
    setItems(prev => [...prev, inputValue.trim()]);
    setInputValue(""); // 입력 후 입력창 비우기
    inputRef.current?.focus(); // 입력 후 입력창에 포커스 유지
  }

  
  return (
    <section className="todo-app">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="할 일을 입력하세요"  />
        <Button onClick={handlerAddItem}>
          저장
          <Save />
        </Button>
      </div>
      <ul className="todo-info-list">
        {items.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App