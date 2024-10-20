import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ imageUrls }) => {
    return (
        <ImageList sx={{ width: "100%", height: 800 }} cols={3}>
            {imageUrls.map((img) => (
                <ImageListItem key={img}>
                    <img srcSet={`${img}`} src={`${img}`} alt="Note image" loading="lazy" />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
