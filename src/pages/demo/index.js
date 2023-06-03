import { Link } from "react-router-dom";
import { Button, Checkbox, Col, Row } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

import { SidebarLayout, FullpageLayout } from "../../components/layout";
import { PublicWrapper } from "../../components/wrapper";
import { LoadingPage } from "../../components/loading";
import { CustomInput } from "../../components/antd-custom/CustomInput";
import {
  CustomCheckbox,
  CustomCheckboxGroup,
} from "../../components/antd-custom/CustomCheckbox";
import { CustomTextArea } from "../../components/antd-custom/CustomTextArea";
import { CustomSelect } from "../../components/antd-custom/CustomSelect";
import { CustomParagraph } from "../../components/antd-custom/CustomTypography";
import { CustomDatePicker } from "../../components/antd-custom/CustomDatePicker";
import { CustomRadioGroup } from "../../components/antd-custom/CustomRadio";
import {
  CustomDragger,
  CustomUpload,
} from "../../components/antd-custom/CustomUpload";
import { CustomSlider } from "../../components/antd-custom/CustomSlider";
import { CustomProgress } from "../../components/antd-custom/CustomProgress";
import { CustomSwitch } from "../../components/antd-custom/CustomSwitch";
import { CustomEmpty } from "../../components/antd-custom/CustomEmpty";
import { CustomTable } from "../../components/antd-custom/CustomTable";
import { CustomTabs } from "../../components/antd-custom/CustomTabs";
import { CustomAlert } from "../../components/antd-custom/CustomAlert";
import { CustomMessage } from "../../components/antd-custom/CustomMessage";
import { CustomResult } from "../../components/antd-custom/CustomResult";
import { CustomNotification } from "../../components/antd-custom/CustomNotification";
import { CheckboxWithButton } from "../../components/antd-custom/CustomCheckbox/custom";
import { RadioWithButton } from "../../components/antd-custom/CustomRadio/custom";

const checkboxList = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "A",
    label: "A",
  },
  {
    value: "A",
    label: "A",
  },
];

const checkboxOptions = [
  {
    value: 0,
    label: "Cởi mở, hoà đồng, thân thiện",
  },
  {
    value: 1,
    label: "Khép kín, rụt rè",
  },
];

const dataTable = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const items = [
  { label: "Tab 1", key: "item-1", children: "Content 1" }, // remember to pass the key prop
  { label: "Tab 2", key: "item-2", children: "Content 2" },
];

const messageProps = {
  content: "This is a prompt message with custom className and style",
  className: "font-bold",
};

const notificationProps = {
  message: messageProps.content,
};

export const DemoPage = () => {
  return (
    <PublicWrapper>
      <SidebarLayout title="Antd Custom">
        <p className="font-bold mt-3 mb-1">Custom Input</p>
        <CustomInput placeholder="Test props" />
        <p className="font-bold mt-3 mb-1">Custom Select</p>
        <CustomSelect className="w-full" placeholder="Test props" />
        <p className="font-bold mt-3 mb-1">Custom Date Picker</p>
        <CustomDatePicker
          defaultValue={moment("01/01/2015", "DD/MM/YYYY")}
          format={"DD/MM/YYYY"}
        />
        <p className="font-bold mt-3 mb-1">Custom TextArea</p>
        <CustomTextArea placeholder="Test props" />
        <p className="font-bold mt-3 mb-1">Custom Paragraph (Typography)</p>
        <CustomParagraph
          editable
          ellipsis={{
            rows: 3,
            expandable: true,
          }}
        >
          As the sun rose over the horizon, the city began to stir from its
          slumber. The streets were quiet, save for the sound of a few early
          risers rushing off to work or to their daily routines. The morning air
          was crisp, and the sky was painted with hues of pink and orange, a
          sight that never failed to amaze those who took the time to appreciate
          it. The buildings, which were once shrouded in darkness, slowly began
          to come alive as the first rays of sunlight illuminated their facades.
          The city was a bustling metropolis, filled with people from all walks
          of life, each with their own story to tell. As the day progressed, the
          streets became busier, and the sounds of honking cars and chatter
          filled the air. People rushed to and fro, going about their business,
          while others took the time to soak in the sights and sounds of the
          city. Despite the chaos and noise, there was a certain beauty to it
          all, a sense of energy that permeated everything. It was a city that
          never slept, a city that was always alive, always changing, and always
          full of surprises
        </CustomParagraph>
        <p className="font-bold mt-3 mb-1">
          Custom Checkbox (type: group, with children)
        </p>
        <CustomCheckboxGroup type="children">
          <Row>
            <Col span={8}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
        </CustomCheckboxGroup>
        <p className="font-bold mt-3 mb-1">
          Custom Checkbox (type: group, with list)
        </p>
        <CustomCheckboxGroup type="list" list={checkboxList} />
        <p className="font-bold mt-3 mb-1">
          Custom Radio (type: group, with list)
        </p>
        <CustomRadioGroup type="list" list={checkboxList} />
        <p className="font-bold mt-3 mb-1">Custom Switch</p>
        <CustomSwitch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          defaultChecked
        />
        <p className="font-bold mt-3 mb-1">Custom Slider</p>
        <CustomSlider range defaultValue={[20, 50]} />
        <p className="font-bold mt-3 mb-1">Custom Progress</p>
        <div className="flex gap-3">
          <CustomProgress type="circle" percent={75} />
          <CustomProgress type="circle" percent={100} />
        </div>
        <CustomProgress percent={30} />
        <p className="font-bold mt-3 mb-1">Custom Upload</p>
        <CustomUpload />
        <CustomDragger />
        <p className="font-bold mt-3 mb-1">Custom Empty</p>
        <CustomEmpty />
        <p className="font-bold mt-3 mb-1">Custom Table</p>
        <CustomTable dataSource={dataTable} columns={columns} />
        <p className="font-bold mt-3 mb-1">Custom Tabs</p>
        <CustomTabs items={items} />
        <p className="font-bold mt-3 mb-1">Custom Alert</p>
        <CustomAlert
          message="Demo alert"
          description="Text"
          type="info"
          closable
        />
        <p className="font-bold mt-3 mb-1">Custom Message</p>
        <div className="flex gap-3">
          <Button
            danger
            type="primary"
            onClick={() => CustomMessage(messageProps, "error")}
          >
            Error
          </Button>
          <Button
            type="primary"
            onClick={() => CustomMessage(messageProps, "success")}
          >
            Success
          </Button>
        </div>
        <p className="font-bold mt-3 mb-1">Custom Result</p>
        <CustomResult
          status="404"
          title="Not Found"
          // subTitle="Please check and modify the following information before resubmitting."
          extra={[
            <Button type="primary" key="console">
              Back to home
            </Button>,
          ]}
        >
          <div className="desc">
            <CustomParagraph>
              <p>The content you submitted has the following error:</p>
            </CustomParagraph>
            <CustomParagraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Your account has been frozen. <a>Thaw immediately &gt;</a>
            </CustomParagraph>
            <CustomParagraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Your account is not yet eligible to apply.{" "}
              <a>Apply Unlock &gt;</a>
            </CustomParagraph>
          </div>
        </CustomResult>
        <p className="font-bold mt-3 mb-1">Custom notification</p>
        <div className="flex gap-3">
          <Button
            danger
            type="primary"
            onClick={() => CustomNotification(notificationProps, "error")}
          >
            Error
          </Button>
          <Button
            type="primary"
            onClick={() => CustomNotification(notificationProps, "success")}
          >
            Success
          </Button>
        </div>
        <CheckboxWithButton options={checkboxOptions} />
        <div className="mb-3"></div>
        <RadioWithButton options={checkboxOptions} />
      </SidebarLayout>
    </PublicWrapper>
  );
};
