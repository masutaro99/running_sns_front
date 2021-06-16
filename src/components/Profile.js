import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const Profile = ({ profileData }) => {
  return (
    <Card style={{ position: "relative", display: "flex", marginBottom: 10 }}>
      <CardContent sytle={{ padding: 5 }}>
        <Typography variant="h6">
          title: {profileData.title} 距離:{profileData.distance}
        </Typography>
        <Typography>
          <span>詳細:{profileData.description}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;
