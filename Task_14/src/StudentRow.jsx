import React from 'react'

const StudentRow = ({students}) => {
    const Title = (score) => {
        
        if(score < 3) {
            return { title: "Yếu", color: "red" }
        }
        if (score >= 3 && score < 6) {
            return { title: "Trung Bình", color: "#FFAE42" }
        }
        if (score >= 6 && score <= 8) {
            return { title: "Khá", color: "blue" }
        }
        if (score > 8 && score < 9.5) {
            return { title: "Giỏi", color: "purple" }
        }
        if (score >= 9.5 && score <= 10) {
            return { title: "Xuất Sắc", color: "pink" }
        }
        return;
    }

    const hihi = Title(students.score);

  return (
      <tr>
        <td>{students.id}</td>
        <td>{students.fullName}</td>
        <td>{students.gender}</td>
        <td>{students.age}</td>
        <td>{students.major}</td>
        <td>{students.score}</td>
        <td style={{color: hihi.color}}>{hihi.title}</td>
      </tr>
  )
}

export default StudentRow
