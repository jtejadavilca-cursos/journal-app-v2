import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";

export const ImageGallery = () => {
    const { active: note } = useSelector((state) => state.journal);
    const { imageUrls, title } = note;

    return (
        <ImageList sx={{ width: "100%", height: 800 }} cols={3}>
            {imageUrls.map((img) => (
                <ImageListItem key={img}>
                    <img srcSet={`${img}`} src={`${img}`} alt={title} loading="lazy" />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
