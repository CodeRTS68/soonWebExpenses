import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

export function CardTransaction({ transcaction }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" align="center">
          {transcaction.category} - {transcaction.type}
        </Typography>
        <Typography component="p" align="center">
          IDR{transcaction.amount.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
