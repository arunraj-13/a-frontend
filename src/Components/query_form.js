import React, { useEffect } from 'react'
import { Form, Button, Container, Row, Col  } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { updateQuestion } from '../redux/questionSlice'
import Chapter from '../redux/chapter'

const Query = () => {
    
    const [subject, setSubject] = useState(["Select the subject"]);
    const [sub, setSub] = useState()
    const [chapter, setChapter] = useState(["Select the chapter"])
    const [chap, setChap] = useState()

    const navigate = useNavigate()
    const reduxQuestion = useSelector((state) => state.questionUpdate.value)
    const dispatch = useDispatch()
    
    
    
    
    const changeSubject = (year) =>{
        if(year == 1){
            setSubject(["Anatomy", "Physiology", "Biochemistry"])
            setSub("Anatomy")  
        }else if(year == 2){
            setSubject(["Pathology","Pharmacology","Microbiology"])
            setSub("Pathology") 
        }else if(year == 3){
            // setSubject(["Ent","Spm","Opthalmology"])
            setSubject(["Spm"])
            setSub("Spm") 
        }else if(year == 4){
            setSubject(["Medicine","Surgery","Obg","Pediatrics"])
            setSub("Medicine") 
        }else{
            setSubject(["Select the subject"])
        }
        
        }
    
    const handleChange = (value) =>{
        changeSubject(value)
        
    }
    const changeSub = (value) =>{
        setSub(value)
    }
    const changeChapter = (sub) =>{
        if(sub === "Anatomy"){
            setChapter(Chapter.Anatomy)
        }else if(sub === "Spm"){
            setChapter(Chapter.Spm)
        }
        else{
            setChapter(["1", "2", "3"])
        }
    }
    const changeChap = (val) =>{
        setChap(val)
        
    }
    useEffect(()=>{
        changeChapter(sub)
    },[sub])
    useEffect(()=>{
        setChap(chapter[0])
    },[chapter])
    const sendTheData = () =>{
        console.log(sub)
        fetch('https://alphatestapp.onrender.com/question',{
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "chapter" : chap
            })}).then(res => res.json())
            .then((data) => {
                dispatch(updateQuestion(data))
                navigate("/result")

            })
            .catch(err=>console.log(err))
        
    }
   
    return (
        <Form>
            <Container className = 'justify-content-md-center'>
                
                <Row className='mb-3'>
                    <Col>
                        <Form.Select aria-label="Default select example">
                            <option>The Tamil Nadu Dr. M.G.R. Medical University</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Default select example" onChange={(event)=>{handleChange(event.target.value)}}>
                            {/* <option value="0">Year</option>
                            <option value="1">First year</option>
                            <option value="2">Second year</option> */}
                            <option value="3">Pre-final year</option>
                            {/* <option value="4">Final year</option> */}
                        </Form.Select>
                        
                    </Col>
                    
                </Row>
                <Row className='mb-3'>
                        
                            <Form.Select aria-label="Default select example" onChange={(event)=>{
                                changeSub(event.target.value)
                                //changeChapter(event.target.value)
                            }}>
                            {
                                subject.map(val => {
                                    return <option value={val}>{val.toUpperCase()}</option>
                                })
                            }
                            </Form.Select>
                        
                </Row>
                <Row className='mb-3'>
                        
                            <Form.Select aria-label="Default select example" onChange={(event)=>{changeChap(event.target.value)}}>
                            {
                                chapter.map(val => {
                                    return <option value={val}>{val.toUpperCase()}</option>
                                })
                            }
                            </Form.Select>
                        
                </Row>
                <Row>
                    <Button variant="primary" type="submit" onClick={(e) => {
                        e.preventDefault()
                        sendTheData()
                        
                        }}>
                        Submit
                    </Button>
                    
                </Row>
        </Container>
        </Form>
    )
    }

export default Query