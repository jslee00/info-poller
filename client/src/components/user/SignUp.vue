<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <router-link :to="{name:'userSignUp'}">
            <div class="card card-container">
              <div class="my-auto">
                <div class="card-text">
                  <i class="fas fa-user mr-2"></i> User 가입
                </div>
              </div>
            </div><!-- .card-container -->
          </router-link>
        </div>
        <div class="col-6">
          <router-link :to="{name:'adminSignUp'}">
            <div class="card card-container">
              <div class="my-auto">
                <div class="card-text">
                  <i class="fas fa-cogs mr-2"></i> Admin 가입
                </div>
              </div>
            </div><!-- .card-container -->
          </router-link>
        </div>
      </div>
      
    </div><!-- .container -->
  </div>
</template>

<script>
import NavScroller from "../NavScroller";

export default {
  name: "signUp",
  components: { NavScroller },
  data: function() {
    return {
      submenu: [
        {
          text: "Login",
          badge: 0,
          to: { name: "login" }
        },
        {
          text: "Sign Up",
          badge: 0,
          to: { name: "signUp" }
        }
      ]
    };
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .card-text {
    font-size: 18px !important;
    line-height: 18px !important;
  }
}

.card-container.card {
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  /* just in case there no content */
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.card-text {
  text-align: center;
  font-size: 30px;
  line-height: 30px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
