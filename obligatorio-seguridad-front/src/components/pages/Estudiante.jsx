import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
export const Estudiante = () => {
    const [imageStudent, setImageStudent] = useState(false)

    const [imageStudentSrc, setImageStudentSrc] = useState(false)

    const fetchImagesStudent = async () => {
        const url = `${process.env.REACT_APP_API_URL}/images/image-student`
        const token = localStorage.getItem('token') || ''

        const method = 'GET'
        const response = await fetch(url, {
            method,
            headers: {
                'x-token': token,
            },
        })
        if (response.status === 400) {
            Swal.fire('Error', 'Verifique que tenga los permisos', 'error')
            return
        }
        const responseBlob = await response.blob();
        const src = URL.createObjectURL(responseBlob);
        setImageStudentSrc(src)
        setImageStudent(true)
    }

    return (
        <div className="container">
            <h1 className="text-muted">Student Panel</h1>
            <hr />
            <div className="display-5">Content for the student</div>
            <div className="">
                <p className="">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                </p>
                <div className="text-center">
                    <button
                        className="btn btn-primary m-5 p-3"
                        onClick={fetchImagesStudent}>
                        Get Common User Image
                    </button>
                    <div
                        id="commonimg"
                        className={imageStudent ? '' : 'd-none'}>
                        <h3>Common User Image</h3>
                        <img src={imageStudentSrc} alt="Common User" />
                        <hr />
                        <button
                            className="btn btn-primary m-5 p-3"
                            onClick={() => {
                                setImageStudent(false)
                            }}>
                            Hide Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
