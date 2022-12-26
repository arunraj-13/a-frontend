import React, { useEffect, useState, useRef } from 'react'
import { Row, Col,Container ,Table, Form, Button, Badge} from 'react-bootstrap';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate()
  const reduxQuestion = useSelector((state) => state.questionUpdate.value)
  const [repeat, setRepeat] = useState(false)
  const [page, setPage] = useState(false)
  const [essayInOrder, setEssayInOrder] = useState([])
  const [shortInOrder, setShortInOrder] = useState([])
  
  const initialRender = useRef(true)
  var essay = reduxQuestion.Essay
  var short_notes = reduxQuestion.shortNotes
  let essayCount = 0
  let shortCount = 0
  const essaySerialNo = () =>{
    essayCount += 1
    return essayCount
  }
  const shortSerialNo = () =>{
    shortCount += 1
    return shortCount
  }
  useEffect(()=>{
      
    if(initialRender.current){
      initialRender.current = false
    }
    else{
      if(repeat){
        let Essay = [...essay]
        let sortedEssay = Essay.sort(
          (p1, p2) => (p1.repeated < p2.repeated) ? 1 : (p1.repeated > p2.repeated) ? -1 : 0)
        setEssayInOrder(sortedEssay)
        let Short = [...short_notes]
        let sortedShortNotes = Short.sort(
          (p1, p2) => (p1.repeated < p2.repeated) ? 1 : (p1.repeated > p2.repeated) ? -1 : 0)
        setShortInOrder(sortedShortNotes)
      }
      else{
        setEssayInOrder(essay)
        setShortInOrder(short_notes)
      }
    }
},[repeat])
useEffect(()=>{
  if(initialRender.current){
    initialRender.current = false
  }
  else{
  
    if(page){
      let Essay = [...essay]
      let sortedEssay = Essay.sort(
        (p1, p2) => (p1.book1 < p2.book1) ? -1 : (p1.book1 > p2.book1) ? 1 : 0)
      setEssayInOrder(sortedEssay)
      let Short = [...short_notes]
      let sortedShortNotes = Short.sort(
        (p1, p2) => (p1.book1 < p2.book1) ? -1 : (p1.book1 > p2.book1) ? 1 : 0)
      setShortInOrder(sortedShortNotes)
      
    }else{
      setEssayInOrder(essay)
      setShortInOrder(short_notes)
      
    }
  }
},[page])
  if(reduxQuestion){
   
  const handleRepeat = () =>{
    setRepeat(!repeat)
    //console.log(repeat)

  }
  const handlePage = () =>{
    setPage(!page)
    //console.log(page)
  }
  
  
  return (
    <>
      {/* Weightage, Repeatability, Page Wise */}
      <Container className = 'justify-content-center align-items-center'> 
        <Row className='mt-2 mb-2'>
          <Col>
            <Form.Group className="md-auto" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Sort by repeatability" onChange={()=>{handleRepeat()}}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="md-auto" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Sort by page wise" onChange={()=>{handlePage()}}/>
            </Form.Group>
          </Col>     
        </Row>
      </Container>
      <Badge bg="primary">
        Essay
      </Badge>
      <Table striped bordered hover className='w-auto'>
      <thead className='table-dark'>
        <tr>
          <th className='w-auto'>S.No</th>
          <th>Questions</th>
          
        </tr>
      </thead>
      <tbody>
        
        {essayInOrder.map(val => {
          
          return <tr>
          <td>{essaySerialNo()}</td>
          <td>{val.title}
            <Badge pill bg="success">{val.repeated}</Badge>
            <Badge pill bg="info">P.No {val.book1}</Badge>
          </td>
        </tr>})}
      </tbody>
      </Table>
      <Badge bg="primary">
        Short Notes
      </Badge>
      <Table striped bordered hover>
      <thead className='table-dark'>
        <tr>
          <th>S.No</th>
          <th>Questions</th>
          
        </tr>
      </thead>
      <tbody>
        {shortInOrder.map(val => {return <tr>
          <td>{shortSerialNo()}</td>
          <td>{val.title}
            <Badge pill bg="success">{val.repeated}</Badge>
            <Badge pill bg="info">P.No {val.book1}</Badge>
          </td>
        </tr>})}
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>

    </>
  )
  }else(
    navigate('/')
  )
  
}

export default Result;
