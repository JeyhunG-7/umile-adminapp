import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import * as loading from "../../Lottie/loader-circle.json";
import * as doneLoading from "../../Lottie/done-loading.json";
import * as loadingWhiteCircle from "../../Lottie/loader-circle-white.json";

export default function DynamicIcon(props) {
    let showLoop = props.loop;

    var iconList = {
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