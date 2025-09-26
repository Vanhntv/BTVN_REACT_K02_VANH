import React from 'react'
import StudentRow from './StudentRow'

const StudentsList = ({students}) => {
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ Và Tên</th>
            <th>Giới Tính</th>
            <th>Tuổi</th>
            <th>Chuyên ngành</th>
            <th>Điểm trung bình</th>
            <th>Danh hiệu</th>
          </tr>
        </thead>
        <tbody>
            {students.map((item) => (
                <StudentRow key={item.id} students={item}/>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentsList
