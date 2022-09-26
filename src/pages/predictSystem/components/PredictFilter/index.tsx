import { Form, FormProps, Select, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const PredictFilter = (props: FormProps) => {
  return (
    <Form form={props.form} layout="inline">
      <Form.Item label="Stock Code">
        <Select
          mode="tags"
          style={{ width: 320 }}
          placeholder="Choose Stock Code"
        >
          <Select.Option key={600000}>{600000}</Select.Option>
          <Select.Option key={600001}>{600001}</Select.Option>
          <Select.Option key={600002}>{600002}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date Rank">
        <RangePicker />
      </Form.Item>
    </Form>
  );
};

export default PredictFilter;
