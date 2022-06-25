import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
export const Admin = () => {
    const [imageAdmin, setImageAdmin] = useState(false)
    const [imageAdminSrc, setImageAdminSrc] = useState(false)

    const fetchImagesAdmin = async () => {
        const url = `${process.env.REACT_APP_API_URL}/images/image-admin`
        const token = localStorage.getItem('token') || ''

        const method = 'GET'
        const response = await fetch(url, {
            method,
            headers: {
                'x-token': token,
            },
        })
        if (response.status===400) {
            
            Swal.fire('Error', 'Verifique que tenga los permisos', 'error')
            return;
        }
        const responseBlob = await response.blob()
        const src = URL.createObjectURL(responseBlob)
        setImageAdminSrc(src)
        setImageAdmin(true)
    }

    return (
        <div className="container">
            <h1 className="text-muted">Admin Panel</h1>
            <hr />
            <div className="display-5">Content for the administrator</div>
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
                        className="btn btn-danger m-5 p-3"
                        onClick={fetchImagesAdmin}>
                        Get Admin User Image
                    </button>

                    <div id="adminimg" className={imageAdmin ? '' : 'd-none'}>
                        <h3>Administrator Image</h3>
                        <img src={imageAdminSrc} alt="Admin User" />
                        <hr />
                        <button
                            className="btn btn-primary m-5 p-3"
                            onClick={() => {
                                setImageAdmin(false)
                            }}>
                            Hide Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
