import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    const [blogs, setBlogs] = useState([
        
    ]);
    
    const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
    const [editingBlog, setEditingBlog] = useState(null);

    const createBlog = () => {
        const newEntry = { ...newBlog, _id: Date.now().toString() };
        setBlogs([...blogs, newEntry]);
        resetForm();
        toast.success('Blog created successfully!');
    };

    const updateBlog = () => {
        if (!editingBlog) return;
        setBlogs(blogs.map(blog => blog._id === editingBlog ? { ...blog, ...newBlog } : blog));
        resetForm();
        toast.success('Blog updated successfully!');
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted!');
    };

    const editBlog = (blog) => {
        setNewBlog({ title: blog.title, content: blog.content, author: blog.author });
        setEditingBlog(blog._id);
    };

    const resetForm = () => {
        setNewBlog({ title: '', content: '', author: '' });
        setEditingBlog(null);
    };

    return (
        <div className='container'>
            <ToastContainer />
            <h1>Blogging Platform</h1>
            <div className='blog-form'>
                <input placeholder='Title' value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
                <textarea placeholder='Content' value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} />
                <input placeholder='Author' value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />

                {editingBlog ? (
                    <>
                        <button className="update-btn" onClick={updateBlog}>Update Blog</button>
                        <button className="cancel-btn" onClick={resetForm}>Cancel</button>
                    </>
                ) : (
                    <button className="create-btn" onClick={createBlog}>Create Blog</button>
                )}
            </div>

            <ul className='blog-list'>
                {blogs.map((blog) => (
                    <li key={blog._id} className='blog-item'>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <small>By {blog.author}</small>
                        <button className="edit-btn" onClick={() => editBlog(blog)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
