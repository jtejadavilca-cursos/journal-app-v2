import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TurnedInNot } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    };

    return (
        <ListItem key={id} disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
