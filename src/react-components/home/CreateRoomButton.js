import React from "react";
import { FormattedMessage } from "react-intl";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { Button } from "../input/Button";
import { useCssBreakpoints } from "react-use-css-breakpoints";

export function CreateRoomButton() {
  const breakpoint = useCssBreakpoints();

  return (
    <Button
      thick={breakpoint === "sm" || breakpoint === "md"}
      xl={breakpoint !== "sm" && breakpoint !== "md"}
      preset="landing"
      onClick={async () => {
        const response = await fetch('https://vdc-dev.gemiso.com/larchiveum/v1/exhibitions?page=1&pageSize=9&sort=startDate|asc');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson);

        // e.preventDefault();
        // createAndRedirectToNewHub(null, null, false);
      }}
    >
      <FormattedMessage id="create-room-button" defaultMessage="Get Data Here" />
    </Button>
  );
}
