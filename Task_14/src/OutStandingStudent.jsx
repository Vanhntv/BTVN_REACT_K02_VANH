import React from 'react'

const OutStandingStudent = ({students}) => {
    return (
        <div>
      <h2>Sinh Viên Tiêu Biểu</h2>
      <p>Tên Sinh Viên: {students.fullName}</p>
      <p>Chuyên Ngành: {students.major}</p>
      <p>Điểm: {students.score}</p>
    </div>
  )

}

export default OutStandingStudent
