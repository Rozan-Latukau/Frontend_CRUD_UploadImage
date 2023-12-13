import React, { useState, useEffect, useCallback} from "react";
import { Container, Button, Form, Figure, Image} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLiga = () => {
    const[title, setTitle] = useState("");
    const[leagues, setLeagues] = useState("");
    const[file, setFile] = useState("");
    const[review, setReview] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    const getLigaById = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/ligas/${id}`);
            setTitle(res.data.name);
            setLeagues(res.data.leagues);
            setFile(res.data.Image);
            setReview(res.data.url);   
        } catch (error) {
            console.log(error);
        }

    },[id]);

    useEffect(() => {
        getLigaById();
    }, [getLigaById]);

    const loadImg = (e) => {
        const Image = e.target.files[0];
        setFile(Image)
        setReview(URL.createObjectURL(Image))
    }

    const updateLiga = async(e) => {
        e.preventDefault();
        const formLiga = new FormData();
        formLiga.append("file", file);
        formLiga.append("leagues", leagues);
        formLiga.append("title", title);
        try {
            await axios.patch(`http://localhost:3000/ligas/${id}`, formLiga, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Form className="b-light p-4 border border-black" onSubmit={updateLiga}>
                <Form.Group className="mb-3">
                    <Form.Label>Name Club</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Name Club" 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name Liga</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Name Liga"
                    value={leagues} 
                    onChange={(e)=>setLeagues(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>File Image</Form.Label>
                    <Form.Control 
                    type="file" 
                    placeholder="Add Image" 
                    onChange={loadImg}/>
                     {review ? (
                   <Figure className="mt-3 mb-0">
                       <Image src={review} alt="review image" className="reviewImg"></Image>
                   </Figure>
                ):(
                    ""
                )}
                </Form.Group>
                
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    )
}

export default EditLiga;