import React from "react";
import {Container,PostForm as PostFormComponent} from "../components";

export default function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <PostFormComponent />
            </Container>
        </div>
    )
}