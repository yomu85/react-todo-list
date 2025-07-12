import { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import "./App.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// 개별 TodoItem 컴포넌트 (드래그 가능)
function SortableTodoItem({ item, onToggle, onRemove }: {
  item: TodoItem;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: item.id,
    transition: {
      duration: 150, // 더 빠른 전환
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // 드래그 중에는 transition 비활성화
    opacity: isDragging ? 0.6 : 1, // 투명도 조정
    zIndex: isDragging ? 1000 : 'auto',
  };

  // 체크박스와 삭제 버튼 클릭 시 드래그 방지
  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(item.id);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "todo-item-draggable",
        isDragging && "dragging"
      )}
    >
      <Label 
        className={cn("todo-info-label", item.completed && "checked")} 
        htmlFor={`todo-${item.id}`}
        onClick={(e) => e.preventDefault()} // 라벨 클릭 방지
      >
        <Checkbox 
          id={`todo-${item.id}`} 
          checked={item.completed} 
          onCheckedChange={handleCheckboxChange}
          onClick={handleCheckboxChange}
        />
        {item.text}
      </Label>
      <Button 
        variant="ghost" 
        onClick={handleRemoveClick}
        onMouseDown={(e) => e.stopPropagation()} // 드래그 시작 방지
      >
        <Trash2 />
      </Button>
    </li>
  );
}

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 드래그 센서 설정 (더 부드러운 드래그를 위한 최적화)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 더 민감하게 (기본값보다 낮춤)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      inputRef.current?.focus();
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setItems((prev) => [...prev, newTodo]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleRemoveTodo = (id: number) => {
    setItems((prev) => 
      prev.filter((todo) => todo.id !== id )
    );
  };

  const handleToggleTodo = (id: number) => {
    setItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 드래그 끝났을 때 순서 변경
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Enter 키로도 추가 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <section className="todo-app">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Input
          className="todo-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={handleAddTodo}>
          저장
        </Button>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="todo-info-list">
            {items.map((item) => (
              <SortableTodoItem
                key={item.id}
                item={item}
                onToggle={handleToggleTodo}
                onRemove={handleRemoveTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
}

export default App;