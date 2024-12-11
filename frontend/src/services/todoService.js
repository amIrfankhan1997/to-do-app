
const BASE_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => {
    const response = await fetch(BASE_URL, {
        headers: { Authorization: localStorage.getItem('token') },
    });
    return response.json();
};

export const addTodo = async (todo) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(todo),
    });
    return response.json();
};

export const updateTodo = async (id, updates) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const deleteTodo = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
    });
};
