<template>
  <div>
    <section v-loading="loading" element-loading-text="Loading...">
      <el-row>
        <el-col :span="24">
          <!-- 删除过程中，不允许其他操作 -->
          <el-button
            v-if="!showDeleteCheckbox"
            @click="
              dialogFormNewVisible = true;
              form = {};
            "
            type="primary"
            >新增</el-button
          >
          <el-button
            v-if="!showDeleteCheckbox"
            @click="showDeleteCheckbox = true"
            type="danger"
            >删除</el-button
          >
          <!-- 删除过程中，只出现确认删除按钮 -->
          <el-button
            v-if="showDeleteCheckbox"
            @click="
              deleteTableItem(chosenItem);
              showDeleteCheckbox = false;
              chosenItem = [];
            "
            type="danger"
            >确认删除</el-button
          >
          <el-button
            v-if="showDeleteCheckbox"
            @click="showDeleteCheckbox = false"
            >取消</el-button
          >
        </el-col>
      </el-row>
      <el-table
        stripe
        :data="shownData"
        style="width: 100%"
        :default-sort="{ prop: 'register_date', order: 'descending' }"
      >
        <!-- <el-table-column prop="_id" label="id" width="100" sortable></el-table-column> -->
        <el-table-column
          fixed
          prop="name"
          label="商品名称"
          min-width="100"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <!-- el-checkbox 多选框，checked 绑定是否选中，click 绑定点击事件 -->
            <el-checkbox
              v-if="showDeleteCheckbox"
              :checked="chosenItem.indexOf(scope.row._id) > -1"
              @change="toggleChosenItem(scope.row._id)"
              style="margin-right: 5px"
            ></el-checkbox>
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productionDate"
          label="生产日期"
          min-width="100"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shelfLife"
          label="保质期（月）"
          min-width="100"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂家"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格（￥）"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="specs"
          label="规格"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- 删除过程中，禁用其他操作 -->
            <el-button
              :disabled="showDeleteCheckbox"
              @click="
                form = { ...scope.row };
                dialogFormUpdateVisible = true;
              "
              type="info"
              size="small"
              >编辑</el-button
            >
            <el-button
              :disabled="showDeleteCheckbox"
              @click="deleteTableItem([scope.row._id])"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        style="color: #18ab8f"
      ></el-pagination>
    </section>
    <!-- Form -->
    <!-- el-dialog 是弹窗样式，title 绑定弹窗的标题内容，visible 绑定弹窗是否展示 -->
    <el-dialog title="新增" :visible.sync="dialogFormNewVisible">
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" status-icon :rules="formNewRules" ref="form">
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="生产日期"
          :label-width="formLabelWidth"
          prop="productionDate"
        >
          <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
          <el-date-picker
            v-model="form.productionDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="商品生产日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="保质期（月）"
          :label-width="formLabelWidth"
          prop="shelfLife"
        >
          <el-input v-model="form.shelfLife"></el-input>
        </el-form-item>
        <el-form-item
          label="生产厂家"
          :label-width="formLabelWidth"
          prop="manufacturer"
        >
          <el-input v-model="form.manufacturer"></el-input>
        </el-form-item>
        <el-form-item
          label="价格（￥）"
          :label-width="formLabelWidth"
          prop="price"
        >
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item
          label="产品规格"
          :label-width="formLabelWidth"
          prop="specs"
        >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 点击取消的时候，设置弹窗不可见 -->
        <el-button @click="dialogFormNewVisible = false">取 消</el-button>
        <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogFormUpdateVisible">
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" status-icon :rules="formUpdateRules" ref="form">
        <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->

        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="生产日期"
          :label-width="formLabelWidth"
          prop="productionDate"
        >
          <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
          <el-date-picker
            v-model="form.productionDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请填写生产日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="保质期（月）"
          :label-width="formLabelWidth"
          prop="shelfLife"
        >
          <el-input v-model="form.shelfLife"></el-input>
        </el-form-item>
        <el-form-item
          label="生产厂家"
          :label-width="formLabelWidth"
          prop="manufacturer"
        >
          <el-input v-model="form.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item
          label="产品规格"
          :label-width="formLabelWidth"
          prop="specs"
        >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 点击取消的时候，设置弹窗不可见 -->
        <el-button @click="dialogFormUpdateVisible = false">取 消</el-button>
        <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import tableData from "./merchantData.js";
import * as api from "@/api/index.js";
import moment from "moment";
import eachLimit from "async/eachLimit";
//import { formValidatePassword, formValidateUsername } from "@/utils/validator";

// 下面是 Vue 组件
export default {
  data() {
    // const validatePass = (rule, value, callback) => {
    //   if (this.form.checkPass !== "") {
    //     this.$refs.form.validateField("checkPass");
    //   }
    //   callback();
    // };
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.form.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 用作表单绑定的内容
      form: {
        // user_name: "",
        // password: "",
        //checkPass: "",
        productionDate: "",
        specs: "",
        shelfLife: "",
        manufacturer: "",
        price: "",
        name: "",
      },
      value: "",
      options: [
        {
          value: "选项1",
          label: "盒",
        },
        {
          value: "选项2",
          label: "瓶",
        },
        {
          value: "选项3",
          label: "袋",
        },
      ],

      formNewRules: {
        productionDate: [
          {
            type: "data",
            required: true,
            message: "请选择生产日期",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur",
          },
        ],
        specs: [
          {
            //required: true,
            message: "请输入商品规格",
            trigger: "blur",
          },
        ],
        manufacturer: [
          {
            required: true,
            message: "请输入生产厂家",
            trigger: "blur",
          },
        ],
        shelfLife: [
          {
            required: true,
            message: "请输入保质期",
            trigger: "blur",
          },
        ],
      },
      loading: true,
      tableData: [],
      totalCount: 0,
      dialogFormNewVisible: false, // 弹窗是否出现
      dialogFormUpdateVisible: false, // 弹窗是否出现
      currentPage: 1,
      pageSize: 20,
      formLabelWidth: "120px", // 表单 label 的宽度
      showDeleteCheckbox: false, // 是否批量删除
      chosenItem: [], // 选中的选项
      formUpdateRules: {
        productionDate: [
          {
            type: "data",
            required: true,
            message: "请选择生产日期",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur",
          },
        ],
        specs: [
          {
            //required: true,
            message: "请输入商品规格",
            trigger: "blur",
          },
        ],
        manufacturer: [
          {
            required: true,
            message: "请输入生产厂家",
            trigger: "blur",
          },
        ],
        shelfLife: [
          {
            required: true,
            message: "请输入保质期",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMerchandises();
  },
  methods: {
    // 新增/修改一个数据
    updateTableItem(item = {}) {
      // 检查是否有 id，有则更新，没有则新增
      if (undefined !== item._id) {
        const id = item._id;
        delete item._id;
        api
          .updataMerchandisesById(id, item)
          .then((response) => {
            if (response.ok) {
              this.$message({
                message: "Update sucess",
                type: "success",
              });
            } else {
              this.$message({
                message: "Update failed",
                type: "error",
              });
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.getMerchandises();
          });
      } else {
        api
          .createMerchandises(item)
          .then(async (response) => {
            if (response.ok) {
              this.$message({
                message: "Create success",
                type: "success",
              });
            } else {
              const err = await response.json();
              throw err;
            }
          })
          .catch((error) => {
            console.error(error);
            this.$message({
              message: "Create failed",
              type: "error",
            });
          })
          .finally(() => {
            this.getMerchandises();
          });
      }
    },
    // 删除数据
    deleteTableItem(idArr) {
      // async.eachLimit(arr, limit, iterator, callback)
      eachLimit(
        idArr,
        3,
        (idItem, cb) => {
          api
            .deleteMerchandisesById(idItem)
            .then(async (response) => {
              if (response.ok) {
                this.$message({
                  message: "Delete sucess",
                  type: "success",
                });
              } else {
                const err = await response.json();
                throw err;
              }
            })
            .catch((error) => {
              console.error(error);
              this.$message({
                message: "Delete failed",
                type: "error",
              });
            })
            .finally(cb);
        },
        this.getMerchandises()
      );
    },
    // 切换选中的选项
    toggleChosenItem(id) {
      const index = this.chosenItem.findIndex((x) => x.id === id);
      if (index > -1) {
        // 有该选项则删除
        this.chosenItem.splice(index, 1);
      } else {
        // 无该选项则添加
        this.chosenItem.push(id);
      }
    },
    // 提交新增/修改表单
    submitForm() {
      // 校验表单
      // Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 校验通过
          this.dialogFormVisible = false;
          this.updateTableItem(this.form);
        } else {
          // 校验失败
          return false;
        }
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getMerchandises();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getMerchandises();
    },
    getMerchandises() {
      this.loading = true;
      api
        .getMerchandisesList({
          offset: this.startIndex,
          limit: this.pageSize,
        })
        .then(async (response) => {
          const respData = await response.json();
          if (response.ok) {
            this.$message({
              message: "Get sucess",
              type: "success",
            });
            return respData;
          } else {
            throw respData;
          }
        })
        .then((jsonData) => {
          this.totalCount = jsonData.metadata.Total;
          this.tableData = jsonData.data;
        })
        .catch((error) => {
          console.error(error);
          this.$message({
            message: "Get failed",
            type: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    shownData() {
      return this.tableData.map((item) => {
        return Object.assign(item, {
          productionDate: moment(item.register_date).format("YYYY-MM-DD"),
        });
      });
    },
  },
};
</script>

<style></style>
