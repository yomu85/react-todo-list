import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import './App.css'

function App() {
  const [items, setItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerAddItem = () => {
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;
    setItems((prevItems) => [...prevItems, inputValue]);
    inputRef.current!.value = ''; // Clear the input field after adding the item
  }
  return (
    <section className="todo-app">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Input ref={inputRef} placeholder="할 일을 입력하세요"  />
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