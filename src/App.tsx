import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";
import "./App.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      // 입력값이 비어있거나 공백만 있는 경우 추가하지 않음
      inputRef.current?.focus(); // 입력 후 입력창에 포커스 유지
      return;
    }

    // 새 할 일 객체로 추가
    const newTodo: TodoItem = {
      id: Date.now(), // 현재 시간을 ID로 사용
      text: inputValue.trim(),
      completed: false,
    };

    setItems((prev) => [...prev, newTodo]);
    setInputValue(""); // 입력 후 입력창 비우기
    inputRef.current?.focus(); // 입력 후 입력창에 포커스 유지
  };

  const handleToggleTodo = (id: number) => {
    setItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <section className="todo-app">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Input
          className="todo-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={handleAddTodo}>
          저장
          <Save />
        </Button>
      </div>
      <ul className="todo-info-list">
        {items.map((item) => (
          <li key={item.id}>
            <Label className={cn("todo-info-label", item.completed && "checked")} htmlFor={`todo-${item.id}`}>
              <Checkbox id={`todo-${item.id}`} checked={item.completed} onCheckedChange={() => handleToggleTodo(item.id)} />
              {item.text}
            </Label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
