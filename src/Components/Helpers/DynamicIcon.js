import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as contactUs from "../../Lottie/contact-us.json";
import * as notFound from "../../Lottie/not-found.json";
import * as resetPassword from "../../Lottie/reset-password.json";
import * as loading from "../../Lottie/loader-circle.json";
import * as doneLoading from "../../Lottie/done-loading.json";
import * as loadingWhiteCircle from "../../Lottie/loader-circle-white.json";

export default function DynamicIcon(props) {
    let showLoop = props.loop;

    var iconList = {
        contactUs: {
            loop: true,
            autoplay: true,
            animationData: contactUs.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        notFound: {
            loop: showLoop,
            autoplay: true,
            animationData: notFound.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        resetPassword: {
            loop: showLoop,
            autoplay: true,
            animationData: resetPassword.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        loading: {
            loop: showLoop,
            autoplay: true,
            animationData: loading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        loadingWhiteCircle: {
            loop: showLoop,
            autoplay: true,
            animationData: loadingWhiteCircle.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        doneLoading: {
            loop: showLoop,
            autoplay: true,
            animationData: doneLoading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    };

    return (
        !props.type
            ?
            ''
            :
            <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <Lottie options={iconList[props.type]} height={parseInt(props.height)} width={parseInt(props.width)} />
                </div>
            </FadeIn>
    );
}