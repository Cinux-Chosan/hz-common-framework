import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Input, Tooltip } from "untd";
import styles from "./style.scss";
import { complementReverse } from "../../libs/utils";
import {
  FETCH_RESOURCE_TREE,
  SET_RESOURCE_OPEN_KEYS,
  SET_RESOURCE_SEARCH_TEXT
} from "./action.type";

const { SubMenu } = Menu;
const { Search } = Input;
const sep = "-";
export const formatKey = ({ id = "", resource = "" }) => id + sep + resource;

export class ResourceTree extends React.Component {
  state = {};

  componentDidMount() {
    const { queries } = this.props;
    this.props.getTreeNode({
      lazy_load: true,
      include_child: false,
      ...queries
    });
  }

  handleSearch = searchText => {
    const trimedText = searchText.trim();
    const { queries } = this.props;
    this.props.setSearchText(trimedText);
    this.props.getTreeNode({
      search: trimedText,
      lazy_load: false,
      include_child: false,
      onSearch: true,
      ...queries
    });
  };

  handleOpenChange = openKeys => {
    const { queries, searchText: search } = this.props;
    if (!search) {
      const [latestKey] = complementReverse(openKeys, this.props.openKeys);
      const [, resource] = latestKey.split(sep);
      if (latestKey) {
        this.props.getTreeNode({
          resource,
          lazy_load: true,
          include_child: false,
          ...queries
        });
      }
    }
    this.props.setOpenKeys({ openKeys, search });
  };

  nodeStatus = (props) => {
    const { StatusIcon } = this.props;
    if (StatusIcon) {
      return <StatusIcon {...props} />;
    } else {
      return <Icon type="star" />;
    }
  };

  toolBtns = props => {
    const { toolBtns } = this.props;
    if (toolBtns) {
      return toolBtns.map((Btn, index) => (
        <Btn key={index} {...props} forceUpdate={this.forceUpdate.bind(this)} />
      ));
    } else {
      return <Icon type="star" onClick={this.handleCollection} />;
    }
  };

  loadingState = () => {
    return (
      <Menu.Item disabled className={`${styles.menuItem} ${styles.loading}`}>
        <Icon type="loading" /> 加载中，请稍等...
      </Menu.Item>
    );
  };

  loadAll = (menu, evt) => {
    evt.stopPropagation();
    const { identity, type, queries, searchText: search, openKeys } = this.props;
    const { resource } = menu;
    const key = formatKey(menu);
    this.props.setOpenKeys({ openKeys: [...openKeys, key], search });
    this.props.getTreeNode({
      identity,
      type,
      resource,
      lazy_load: true,
      include_child: false,
      loadAll: true,
      ...queries
    });
  };

  subMenu = ({ menu, resource_name }) => {
    const { SubMenu, SubMenuTools, searchText: search } = this.props;
    if (SubMenu) {
      return <SubMenu node={menu} />;
    } else {
      return (
        <span>
          {/* subMenu 文字 */}
          <span dangerouslySetInnerHTML={{ __html: resource_name }} />
          {/* subMenu 文字右侧 */}
          {SubMenuTools ? (<SubMenuTools node={menu} />) : null}
          <Tooltip title="查看所有直接下级">
            {search ? (
              <Icon
                type="sync"
                className={styles.loadAllBtn}
                spin={menu.loading}
                onClick={this.loadAll.bind(this, menu)}
              />
            ) : null}
          </Tooltip>
        </span>
      );
    }
  };

  // 对 ResourceName 中搜索内容添加醒目样式
  getResourceName = resourceName => {
    const { searchText } = this.props;
    if (searchText) {
      return resourceName.replace(
        new RegExp(`(${searchText})`, "gim"),
        `<span class="${styles.matchedText}">$1</span>`
      );
    } else {
      return resourceName;
    }
  };

  mapMenus = menus => {
    if (menus && menus.length) {
      return menus.map(menu => {
        let { resource_name, child, loading } = menu;
        resource_name = this.getResourceName(resource_name);
        // 将 id-resource 作为主键，避免脏数据导致 key 重复，resource 为必要参数
        const key = formatKey(menu);
        if (child) {
          return (
            <SubMenu
              key={key}
              title={<this.subMenu menu={menu} resource_name={resource_name} />}
            >
              {loading ? this.loadingState() : this.mapMenus(child)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={key} className={styles.menuItem}>
              <span className={`${styles.treeNodeStatus} ${styles.offline}`}>
                <this.nodeStatus node={menu} />
              </span>
              <span className={styles.treeNodeName}>
                <span dangerouslySetInnerHTML={{ __html: resource_name }} />
              </span>
              <div className={styles.toolBox}>
                <this.toolBtns node={menu} />
              </div>
            </Menu.Item>
          );
        }
      });
    } else {
      return (
        <Menu.Item disabled className={`${styles.menuItem} ${styles.nomore}`}>
          <span>没有更多内容...</span>
        </Menu.Item>
      );
    }
  };

  render() {
    const {
      resourceTree,
      searchPlaceholder = "searchPlaceholder",
      openKeys
    } = this.props;

    return (
      <div className="hz-common-web-resource-tree">
        <Search
          placeholder={searchPlaceholder}
          onSearch={this.handleSearch}
          className={styles.searchBox}
        />
        <Menu
          openKeys={openKeys}
          onOpenChange={this.handleOpenChange}
          mode="inline"
          multiple={!!this.props.multiple}
        >
          {resourceTree.loading
            ? this.loadingState()
            : this.mapMenus(resourceTree.data)}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({
  resourceTree,
  resourceTreeOpenKeys,
  resourceTreeSearch: searchText
}) => {
  const { openKeysWithoutSearch, openKeysWhenSearch } = resourceTreeOpenKeys;
  return {
    resourceTree,
    searchText,
    openKeys: searchText ? openKeysWhenSearch : openKeysWithoutSearch
  };
};

const mapDispatchToProps = dispatch => ({
  getTreeNode: payload => dispatch({ type: FETCH_RESOURCE_TREE, payload }),
  setOpenKeys: payload => dispatch({ type: SET_RESOURCE_OPEN_KEYS, payload }),
  setSearchText: payload =>
    dispatch({ type: SET_RESOURCE_SEARCH_TEXT, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceTree);
