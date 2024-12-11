import React, { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';
import { FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
            setLoading(false);
        };
        fetchTodos();
    }, []);

    const handleAddOrUpdateTodo = async () => {
        if (todoInput.trim() === '') {
            setMessage('Please enter a valid to-do.');
            return;
        }

        try {
            if (editingTodoId) {
                const updatedTodo = await updateTodo(editingTodoId, { title: todoInput });
                setTodos(todos.map((todo) => (todo._id === editingTodoId ? updatedTodo : todo)));
                setMessage('To-do updated successfully!');
                setEditingTodoId(null);
            } else {
                const todo = await addTodo({ title: todoInput });
                setTodos([...todos, todo]);
                setMessage('To-do added successfully!');
            }
            setTodoInput('');
        } catch (error) {
            setMessage('Something went wrong, please try again.');
        }
    };

    const handleEditTodo = (id, title) => {
        setEditingTodoId(id);
        setTodoInput(title);
    };

    const handleToggleComplete = async (id, completed) => {
        const updatedTodo = await updateTodo(id, { completed: !completed });
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
        setMessage('To-do deleted successfully!');
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);
        setTodoInput('');
    };

    return (
        <div style={styles.container}>
            <h1>To-Do List</h1>

            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder={editingTodoId ? "Edit your to-do" : "Add a new to-do"}
                    style={styles.input}
                />
                {editingTodoId && (
                    <FaTimes
                        onClick={handleCancelEdit}
                        style={styles.cancelIcon}
                    />
                )}
            </div>
            <button onClick={handleAddOrUpdateTodo} style={editingTodoId ? styles.updateButton : styles.addButton}>
                {editingTodoId ? "Update" : "Add"}
            </button>

            {loading && <p>Loading...</p>}

            <ul style={styles.list}>
                {todos.length === 0 ? (
                    <p>No to-dos available</p>
                ) : (
                    todos.map((todo) => (
                        <li key={todo._id} style={styles.todoItem}>
                            <span
                                onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {todo.title}
                            </span>

                            <div style={styles.buttonContainer}>
                                <button onClick={() => handleEditTodo(todo._id, todo.title)} style={styles.editButton}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo._id)} style={styles.deleteButton}>Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '80%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    cancelIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#F44336',
    },
    addButton: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    updateButton: {
        padding: '10px',
        backgroundColor: '#FFC107',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    todoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#FFC107',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#F44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    message: {
        color: 'green',
        fontWeight: 'bold',
    },

    '@media (max-width: 600px)': {
        container: {
            padding: '15px',
            maxWidth: '90%',
        },
        input: {
            width: '100%',
        },
        button: {
            width: '100%',
            padding: '12px',
        },
        buttonContainer: {
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        editButton: {
            width: '100%',
            marginBottom: '10px',
        },
        deleteButton: {
            width: '100%',
        },
    },
};

export default Dashboard;
