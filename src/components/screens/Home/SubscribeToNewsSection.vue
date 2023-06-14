<template>
  <section class="mt-20 bg-gradient-to-r from-slate-400 from-0% to-slate-500 to-100% p-36">
    <div class="flex items-end gap-20">
      <div class="flex flex-col gap-8">
        <p class="line-after text-base text-slate-600">REGISTER YOUR INTEREST HERE</p>
        <p class="text-4xl text-white">
          To ensure you are kept up to date with our latest news, upcoming events and more, please
          register your interest below
        </p>
      </div>
      <div class="h-16 rounded bg-white">
        <form class="flex h-full items-stretch p-2">
          <input type="email" placeholder="Enter email" class="px-6 focus:outline-none" required />
          <button
            type="submit"
            class="btn btn-accent p-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-after {
  position: relative;
}

.line-after::after {
  content: '';
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  width: 16px;
  height: 2px;
  @apply ml-2 bg-slate-600;
}
</style>
