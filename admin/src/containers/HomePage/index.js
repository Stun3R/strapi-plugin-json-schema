/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import {
  auth,
  InputsIndex as Input,
  CheckPermissions,
  GlobalContext,
} from "strapi-helper-plugin";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Header } from "@buffetjs/custom";
import { Button } from "@buffetjs/core";

// import pluginPermissions from "../../permissions";
import getTrad from "../../utils/getTrad";

import Block from "../../components/Block";

import { ContainerFluid, StyledRow } from "./components";

export class HomePage extends React.Component {
  static contextType = GlobalContext;

  openDocumentation = () => {
    const url = "https://strapi-sdk-js.netlify.app";
    window.open(url, "_blank");

    return window.focus();
  };

  getPluginHeaderActions = () => {
    const actions = [
      {
        color: "none",
        label: this.context.formatMessage({
          id: getTrad("containers.HomePage.Button.open"),
        }),
        className: "buttonOutline",
        onClick: this.openDocumentation,
        type: "button",
        key: "button-open",
        Component: (props) => <Button {...props} />,
      },
    ];

    return actions;
  };

  handleCopy = () => {
    strapi.notification.toggle({
      type: "info",
      message: { id: getTrad("containers.HomePage.copied") },
    });
  };

  render() {
    const { formatMessage } = this.context;
    return (
      <ContainerFluid className="container-fluid">
        <Header
          actions={this.getPluginHeaderActions()}
          title={{
            label: formatMessage({
              id: getTrad("containers.HomePage.PluginHeader.title"),
            }),
          }}
          content={formatMessage({
            id: getTrad("containers.HomePage.PluginHeader.description"),
          })}
        />
        <StyledRow className="row">
          <Block>
            <CopyToClipboard text={auth.getToken()} onCopy={this.handleCopy}>
              <div className="row" style={{ zIndex: "99" }}>
                <Input
                  style={{ zIndex: "9", cursor: "pointer" }}
                  inputStyle={{ cursor: "pointer" }}
                  name="jwtToken"
                  value={auth.getToken()}
                  type="string"
                  onChange={() => {}}
                  label={{ id: getTrad("containers.HomePage.jwtToken") }}
                  inputDescription={{
                    id: getTrad("containers.HomePage.jwtToken.description"),
                  }}
                />
              </div>
            </CopyToClipboard>
          </Block>
        </StyledRow>
      </ContainerFluid>
    );
  }
}

export default memo(HomePage);
