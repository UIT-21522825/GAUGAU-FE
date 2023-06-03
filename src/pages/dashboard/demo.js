import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Select } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { SidebarLayout } from "../../components/layout";
import { PrivateWrapper } from "../../components/wrapper";

const StudentSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const { Option } = Select;
  const handleChange = (value, option) => {
    console.log(`selected ${value}`, option);
  };
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  return (
    <Select
      mode="tags"
      allowClear={true}
      autoClearSearchValue={true}
      placeholder="Nhập để tìm"
      onChange={handleChange}
      onSearch={handleSearch}
      optionLabelProp="label"
      optionFilterProp="value"
      className="w-96 max-w-sm"
    >
      <Option
        key={"name-"+searchValue}
        value={"n:"+searchValue}
        label={"Tên học viên: " + searchValue}
        by="name"
      >
        <p>Tên học viên: {searchValue}</p>
      </Option>
      <Option
        key={"class-"+searchValue}
        value={"c:"+searchValue}
        label={"Lớp: " + searchValue}
        by="class"
      >
        <p>Lớp: {searchValue}</p>
      </Option>
      <Option
        key={"dob-"+searchValue}
        value={"d:"+searchValue}
        label={"Ngày sinh: " + searchValue}
        by="dob"
      >
        <p>Ngày sinh: {searchValue}</p>
      </Option>
    </Select>
  );
};

const StudentTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Search
          </button>
          <button onClick={() => clearFilters && handleReset(clearFilters)}>
            Reset
          </button>
          <button
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </button>
          <button
            onClick={() => {
              close();
            }}
          >
            close
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Tên học viên",
      dataIndex: "name",
      key: "name",
      width: "30%",
      fixed: "left",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      width: "30%",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: "20%",
      filters: [
        {
          text: "Đang học",
          value: "Active",
        },
        {
          text: "Nghỉ học",
          value: "Inactive",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Hành động",
      key: "operation",
      fixed: "right",
      width: "20%",
      render: () => <a>action</a>,
    },
  ];
  const data = [
    {
      key: "1",
      name: "[HV001] John Brown",
      age: 32,
      status: "Active",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "[HV002] Joe Black",
      age: 42,
      status: "Active",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "[HV003] Jim Green",
      age: 32,
      status: "Inactive",
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "[HV004] Jim Red",
      age: 32,
      status: "Inactive",
      address: "London No. 2 Lake Park",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      // scroll={{
      //   x: 1500,
      //   y: 300,
      // }}
      className="min-h-full w-full bg-white mt-5"
      size="small"
    />
  );
};

export const DashboardPage = () => {
  const breadcrumbList = [
    { title: <Link to="/">Điều khiển</Link> },
    { title: <Link to="/student">Học viên</Link> },
  ];
  return (
    <PrivateWrapper>
      <SidebarLayout breadcrumbList={breadcrumbList} title="Học viên">
        <div className="grid w-full">
          <div className="flex justify-between w-full items-start mb-2">
            <button
              className="bg-primary border border-primary text-white p-1 px-2 rounded hover:bg-transparent hover:text-primary "
              type="button"
            >
              Thêm
            </button>
            <StudentSearch />
          </div>
          <StudentTable />
        </div>
      </SidebarLayout>
    </PrivateWrapper>
  );
};
