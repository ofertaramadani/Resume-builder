<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <h4 class="footer-logo">resume.</h4>
        <p class="copyright">© 2024 Resume. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f8f8f8;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  margin: 10px 0; /* Space between logo and text */
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.8px;
  color: #263fa1;
}

.copyright {
  color: #666;
  font-size: 14px;
  margin: 0;
}
</style>
