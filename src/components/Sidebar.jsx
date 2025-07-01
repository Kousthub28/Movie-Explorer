import { Drawer, List, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItemButton component={Link} to="/">Home</ListItemButton>
        <ListItemButton component={Link} to="/my-list">My List</ListItemButton>
      </List>
    </Drawer>
  );
}
