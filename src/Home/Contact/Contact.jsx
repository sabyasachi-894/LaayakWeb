import React from 'react';
import "./contact.css"

const Contact = () => {
    const dev = [
        {
            name: "Himesh Nayak",
            github: "https://github.com/HimeshNayak",
            linkedin: "https://www.linkedin.com/in/himeshnayak015/ ",
            gmail: "mailto:himeshnayak015@gmail.com",
            image: "https://media-exp1.licdn.com/dms/image/C5103AQHO_Jyl6CG8GA/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=F3LtbM89vLovUjBts0OBBmnkalI43MVtKep7kP10HPA"
        },
        {
            name: "Haresh Nayak",
            github: "https://github.com/hareshnayak",
            linkedin: "https://www.linkedin.com/in/hareshnayak08/",
            gmail: "mailto:sketchharry01@gmail.com",
            image: "https://media-exp1.licdn.com/dms/image/C5603AQHFeBYzJ48Byg/profile-displayphoto-shrink_200_200/0?e=1607558400&v=beta&t=ek3HwQzlMXKLwnkixsIxZz2vncpMwBa8jNx4gpz1MBc"
        },
        {
            name: "Parv Sharma",
            github: "https://github.com/PSCoder10462",
            linkedin: "https://www.linkedin.com/in/parv-sharma10462/",
            gmail: "mailto:pscoder10462@gmail.com",
            image: "https://avatars0.githubusercontent.com/u/59911189?s=460&u=aa564b3cd9c35caaf8d6442dd4482fdaa9b0ee2e&v=4"
        },
        {
            name: "Kashish Jain",
            github: "https://github.com/Kashishjain04",
            linkedin: "https://www.linkedin.com/in/kashishjain04/",
            gmail: "mailto:jainabhishek7204@gmail.com",
            image: "https://media-exp1.licdn.com/dms/image/C4D03AQE4XLKG5OwFvQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=Gog1vgLRPj8Rv9yiYpHnK52yTvGJV7BzBs64UdVm4aM"
        }
    ]
    return (
        <div>
            <h1 className="about-title mt-5">Contact Us: </h1>
            {dev.map((item) => (
                <div className="dev-container mx-3 my-4" key={item.name}>
                    <div className="social">
                        <a href={item.github} target="_blank" rel="noopener noreferrer"><i className="fa fa-github" aria-hidden="true"></i> </a>
                    </div>
                    <div className="social">
                        <a href={item.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" aria-hidden="true"></i> </a>
                    </div>
                    <div className="social">
                        <a href={item.gmail} target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" aria-hidden="true"></i> </a>
                    </div>
                    <div className="name">{item.name}</div>
                    <img src={item.image} alt={item.name} />
                </div>
            ))}

        </div>
    );
}

export default Contact;
