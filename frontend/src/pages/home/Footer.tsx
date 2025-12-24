import type { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


export default function Footer() {
    const user = useSelector((state: RootState) => state.user.user);
    const redirect = location;
    return (
        <div className=" pt-3 mx-0.5 text-center" style={{
            backgroundColor: user.color,
            borderRadius: "5px",
            color: "white"
        }}>
            <h1 className="text-center "
                style={{
                    fontSize: "1.3em",
                    fontWeight: 600
                }}
            >Follow me on social media</h1>
            <div className="mt-4 flex justify-center pb-4" style={{
                fontSize: "2em"
            }}>

                <a href="https://github.com/Tawfik404"
                    title='Github'
                    target="_blank"
                    rel='noopener'
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>

                <a href="https://www.instagram.com/tawfik.exe/"
                    title='Instagram'
                    target="_blank"
                    rel='noopener'
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a href="https://www.facebook.com/profile.php?id=61557302341279" title='FaceBook'
                    target="_blank"
                    rel='noopener'
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
            </div>


            <div className="w-full flex flex-row justify-center"
            >
                <h1
                    className="px-1"
                    style={{
                        backgroundColor: "#b0b0b03d",
                        borderRadius: "5px",
                    }}
                >
                    Made in Morocco,Sale

                    <FontAwesomeIcon icon={faLocationDot} />
                </h1>
            </div>
        </div>)
}