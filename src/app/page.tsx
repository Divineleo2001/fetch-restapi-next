"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  mobileNumber: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      setTodos(data.todos);
    };

    fetchTodos();
  }, []);


  console.log(todos)
  // const res = fetch("http://localhost:3000/api/todos", {
  //   next: { revalidate: 60 },
  // });
  // console.log(todos);

  return (
    <main>
      <div>
        {todos?.map((todo, i) => (
          <div key={i}>
            <p>{todo.firstName}</p>
            <p>{todo.lastName}</p>
            <p>{todo.email}</p>
            <p>{todo.gender}</p>
            <p>{todo.age}</p>
            <p>{todo.mobileNumber}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
