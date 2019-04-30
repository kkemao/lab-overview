module.exports = {
  serverlist: [
    {
      title: "系统列表",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          href="javascript:;"
          onClick={() => this.setModalVisible(true, record)}
        >
          {text}
        </a>
      )
    },
    {
      title: "页面地址",
      dataIndex: "url",
      key: "url",
      render: (text, record) => (
        <span>
          <a href={record.url}>{record.url}</a>
        </span>
      )
    },
    {
      title: "业务组件",
      key: "tags",
      dataIndex: "tags",
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: "备注",
      dataIndex: "descr",
      key: "descr"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={() => this.setModalVisible(true, record)}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      )
    }
  ]
};
