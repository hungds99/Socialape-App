import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotificationIcon from "@material-ui/icons/Notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "../../localization";
import { markNotificationsRead } from "../../redux/actions/userAction";

class Notifications extends Component {
    state = {
        anchorEl: null,
    };

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.target,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };

    render() {
        const { notifications } = this.props;
        const { anchorEl } = this.state;
        dayjs.extend(relativeTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter((not) => not.read === false).length > 0
                ? (notificationsIcon = (
                      <Badge
                          badgeContent={
                              notifications.filter((not) => not.read === false)
                                  .length
                          }
                          color="secondary"
                      >
                          <NotificationIcon />
                      </Badge>
                  ))
                : (notificationsIcon = <NotificationIcon />);
        } else {
            notificationsIcon = <NotificationIcon />;
        }

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((not) => {
                    const verb =
                        not.type === "like"
                            ? Localization.common.like
                            : Localization.common.comment;
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? "primary" : "secondary";
                    const icon =
                        not.type === "like" ? (
                            <FavoriteIcon
                                color={iconColor}
                                style={{ margin: 10 }}
                            />
                        ) : (
                            <ChatIcon
                                color={iconColor}
                                style={{ margin: 10 }}
                            />
                        );

                    return (
                        <MenuItem
                            key={not.createdAt}
                            onClick={this.handleClose}
                        >
                            {icon}
                            <Typography
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/user/${not.recipient}/scream/${not.screamId}`}
                            >
                                {not.sender} {verb}{" "}
                                {Localization.common.yourScream} {time}
                            </Typography>
                        </MenuItem>
                    );
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    {Localization.common.noNotifi}
                </MenuItem>
            );

        return (
            <Fragment>
                <Tooltip placement="top" title={Localization.common.notifi}>
                    <IconButton
                        aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
    Notifications
);
