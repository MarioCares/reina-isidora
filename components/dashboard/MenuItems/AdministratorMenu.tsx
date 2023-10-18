import {
  StarBorder,
  ExpandLess,
  ExpandMore,
  LocalPolice,
  Apartment,
} from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import Link from "next/link";

export const AdministratorMenu = () => {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}>
        <ListItemIcon>
          <LocalPolice />
        </ListItemIcon>
        <ListItemText primary="Administración" />
        {isAdminMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isAdminMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href={`/deuda-gastos-comunes/${new Date().getFullYear()}`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Deuda Gastos Comunes" />
            </ListItemButton>
          </Link>
          <Link href={"/departamentos"}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText primary="Departamentos" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
};
