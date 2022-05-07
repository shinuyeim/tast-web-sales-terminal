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
            >批量删除</el-button
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
        :default-sort="{ prop: 'date', order: 'descending' }"
        ><el-table-column
          prop="_id"
          label="订单编号"
          min-width="100"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="订单日期"
          min-width="100"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="批发商"
          min-width="100"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="批发商地址"
          min-width="80"
          sortable
          align="center"
        ></el-table-column
        ><el-table-column
          prop="phone"
          label="批发商联系方式"
          min-width="80"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column label="单价" prop="price" width="70">
        </el-table-column>
        <el-table-column label="数量" prop="count" width="70">
        </el-table-column>
        <el-table-column label="操作" width="220">
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
            <el-button
              :disabled="showDeleteCheckbox"
              @click="toPurchaseOrderItem([scope.row._id])"
              type="primary"
              size="small"
              >详情</el-button
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
        <!-- <el-form-item
          label="批发商"
          :label-width="formLabelWidth"
          prop="wholesaler"
        >
          <el-input v-model="form.wholesaler"></el-input>
        </el-form-item> -->
        <el-form-item
          label="订单日期"
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="若不选则默认为当前日期"
          ></el-date-picker>
          <!-- <el-input v-model="form.register_date"></el-input> -->
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
          label="订单日期"
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="注册日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="批发商"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- <el-form-item label="数量" :label-width="formLabelWidth" prop="amounts">
          <el-input v-model="form.amounts"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth" prop="prices">
          <el-input v-model="form.prices"></el-input>
        </el-form-item> -->
        <el-form-item
          label="联系电话"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="批发商地址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address"></el-input>
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
import * as api from "@/api/index.js";
import moment from "moment";
import eachLimit from "async/eachLimit";

// 下面是 Vue 组件
export default {
  data() {
    return {
      form: {
        _id: "",
        name: "",
        date: "",
        wholesaler: "",
        address: "",
        phone: "",
      },
      //preventRepeat: false, //防止重复获取
      // 用作表单绑定的内容
      formNewRules: {},
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
        date: [
          {
            type: "string",
            required: true,
            message: "请选择注册日期",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入店铺名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字",
            trigger: "blur",
          },
        ],
        // amounts: [
        //   {
        //     required: true,
        //     message: "请选择数量",
        //     trigger: "blur",
        //   },
        // ],
        // prices: [
        //   {
        //     required: true,
        //     message: "请输入价格",
        //     trigger: "blur",
        //   },
        // ],
        address: [
          {
            required: true,
            message: "请输入店铺地址",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入店铺联系电话",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getPurchaseOrder();
  },
  methods: {
    // 新增/修改一个数据
    updateTableItem(item = {}) {
      // 检查是否有 id，有则更新，没有则新增
      console.log(item._id);
      if (undefined !== item._id) {
        const id = item._id;
        delete item._id;
        api
          .updataPurchaseOrderById(id, item)
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
            this.getPurchaseOrder();
          });
      } else {
        api
          .createPurchaseOrder(item)
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
            this.getPurchaseOrder();
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
            .deletePurchaseOrderById(idItem)
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
        this.getPurchaseOrder()
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
      this.getPurchaseOrder();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPurchaseOrder();
    },
    getPurchaseOrder() {
      this.loading = true;
      //this.preventRepeat = false;
      api
        .getPurchaseOrderList({
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
          let itemList = jsonData.data;
          for (let index = 0; index < itemList.length; index++) {
            let orditem = itemList[index];
            this.getWholesaler(orditem);
          }
          this.tableData = itemList;
          //console.log(this.tableData);
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
    toPurchaseOrderItem(id) {
      this.$router.push({ name: "PurchaseOrderItem", query: { id: id } });
    },
    getWholesaler(orditem) {
      const wholesalerId = orditem.wholesaler;
      api
        .getWholesalerByPurchOrderId(wholesalerId)
        .then(async (response) => {
          const respData = await response.json();
          if (response.ok) {
            // this.$message({
            //   message: "Get getMerchandisesInfo sucess",
            //   type: "success",
            // });
            return respData;
          } else {
            throw respData;
          }
        })
        .then((jsonData) => {
          //this.totalCount = jsonData.metadata.Total;
          //console.log(jsonData);
          Object.assign(orditem, jsonData);
          //console.log(orditem);
        })
        .catch((error) => {
          console.error(error);
          this.$message({
            message: "Get failed",
            type: "error",
          });
        });
    },
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    shownData() {
      return this.tableData.map((item) => {
        return Object.assign(item, {
          date: moment(item.date).format("YYYY-MM-DD"),
        });
      });
    },
  },
};
</script>

<style>
</style>
