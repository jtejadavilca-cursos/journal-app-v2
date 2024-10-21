import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ imageUrls }) => {
    return (
        <ImageList sx={{ width: "100%", height: 500 }} cols={3} rowHeight={200} gap={1}>
            {imageUrls.map((img) => (
                <ImageListItem key={img}>
                    <img
                        srcSet={`${img}?w=164&h=200&fit=crop&auto=format&dpr=2 2x`}
                        src={`${img}?w=164&h=200&fit=crop&auto=format`}
                        alt="Note image"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
