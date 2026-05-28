---
title: "当孔子遇上马克思：其实我们早就是一个人了"
date: 2026-05-28
tags:
  - 数学
  - 思想实验
---

## 摘要

本文只给出一个形式模型。设孔子在死亡时刻的原子集合为 $K$，马克思在某一身体采样时刻的原子集合为 $M$。定义随机变量 $S = |K \cap M|$ 为二者的原子交数。本文建立由尸体分解、土壤迁移、海水循环浪费、大气分层扩散、生物圈摄取与人体采样构成的多库室模型，在一般马尔可夫转移与连续扩散框架下证明：只要孔子原子进入可摄取混合库的比例超过阈值

$$
\eta^*(\varepsilon)=\frac{R_{\mathrm{eff}}}{q_K q_M N_K N_M}\log\frac{1}{\varepsilon},
$$

则

$$
P(S \ge 1) \ge 1-\varepsilon.
$$

在 $N_K \asymp N_M \asymp 7 \times 10^{27}$、$R_{\mathrm{eff}} \asymp 10^{47}$ 的数量级下，$\varepsilon = 10^{-6}$ 对应的阈值约为 $10^{-8}$。因此，只需极小的可摄取留存率，即可得到 $S \ge 1$ 的高概率结论。

## 1 符号、对象与判据

令 $t = 0$ 表示孔子死亡并开始进入外部物质循环的时刻，$T > 0$ 表示马克思身体被采样的时刻。本文不讨论心理、社会或思想意义，只定义如下数学判据。

定义 1.1（原子交判据）。设 $K$ 为孔子在 $t = 0$ 时刻身体中全部原子的集合，$M(T)$ 为马克思在时刻 $T$ 身体中全部原子的集合。令

$$
S(T)=|K \cap M(T)|.
$$

若 $S(T) \ge 1$，称马克思与孔子满足一阶物质交条件，记作

$$
K \sim_1 M(T).
$$

本文题目中的“有一部分是一个人”严格解释为事件 $\{S(T) \ge 1\}$。

设元素集合为

$$
E = \{H,O,C,N,P,S,Ca,Na,K,Cl,Mg,\ldots\}.
$$

将孔子原子按元素分解：

$$
K=\bigsqcup_{e\in E}K_e,\qquad |K_e|=N_{K,e}=q_{K,e}N_K,\qquad \sum_{e\in E}q_{K,e}=1.
$$

同理，马克思身体采样时刻的元素分解为

$$
M(T)=\bigsqcup_{e\in E}M_e(T),\qquad |M_e(T)|=N_{M,e}=q_{M,e}N_M,\qquad \sum_{e\in E}q_{M,e}=1.
$$

取总人体原子数数量级

$$
N_K \asymp N_M \asymp N = 7 \times 10^{27}.
$$

## 2 孔子原子的释放函数

尸体分解不是瞬时释放。对每个元素 $e$，把孔子身体中该元素分成快速组分、慢速组分与矿化/骨骼组分。令

$$
\alpha_{e,f}+\alpha_{e,s}+\alpha_{e,b}=1,\qquad \alpha_{e,j}\ge 0,\qquad j\in\{f,s,b\}.
$$

定义释放率

$$
\delta_e(t)=\alpha_{e,f}k_{e,f}e^{-k_{e,f}t}
+\alpha_{e,s}k_{e,s}e^{-k_{e,s}t}
+\alpha_{e,b}k_{e,b}e^{-k_{e,b}t},
$$

对应累积释放函数

$$
D_e(t)=\int_0^t\delta_e(u)\,du
=1-\sum_{j\in\{f,s,b\}}\alpha_{e,j}e^{-k_{e,j}t}. \tag{1}
$$

其中 $k_{e,f}\gg k_{e,s}\gg k_{e,b}\ge 0$。对 $H,O,C,N$ 等易循环元素，可取 $\alpha_{e,f}+\alpha_{e,s}$ 较大；对 $Ca,P$，$\alpha_{e,b}$ 较大。

令释放后进入初始库室的比例向量为

$$
v_e=(v_{e,L},v_{e,W},v_{e,A},v_{e,\mathrm{Bio}},v_{e,\Omega})^\top,\qquad \sum_r v_{e,r}=1.
$$

这里 $L$ 为局部土壤/沉积层，$W$ 为水体入口，$A$ 为大气入口，$Bio$ 为局部生物圈入口，$\Omega$ 为永久或准永久不可摄取损失库。孔子元素 $e$ 原子进入外部可动库的源项为

$$
b_e(t)=N_{K,e}\delta_e(t)v_e. \tag{2}
$$

## 3 多库室转移模型

设库室集合为

$$
R=\{L,R,W_s,W_d,A_0,A_1,A_2,B_g,B_h,H,\Omega\}.
$$

| 符号 | 含义 |
| --- | --- |
| $L$ | 局部土壤、墓葬附近腐殖质、微生物层 |
| $R$ | 河流/径流/浅层地下水 |
| $W_s$ | 海洋混合层或可再进入大气的表层水体 |
| $W_d$ | 深海水体，视为长期滞留库 |
| $A_0$ | 边界层/近地层大气 |
| $A_1$ | 对流层主体 |
| $A_2$ | 平流层或高层大气 |
| $B_g$ | 全球生物圈非人体部分 |
| $B_h$ | 人类食物链可摄取部分 |
| $H$ | 马克思身体采样入口 |
| $\Omega$ | 不可摄取损失库，包括深埋、稳定矿物、永久沉积等 |

令 $X_e(t)=(X_{e,r}(t))_{r\in R}$ 表示孔子元素 $e$ 原子在各库室中的期望数量。一般动力学写成

$$
\frac{d}{dt}X_e(t)=Q_e(t)X_e(t)+b_e(t),\qquad X_e(0)=0, \tag{3}
$$

其中 $Q_e(t)$ 为质量守恒型转移矩阵，满足非对角元非负，对每列有

$$
\sum_{r\in R}Q_{e,rs}(t)\le 0,
$$

等号不成立的部分进入 $\Omega$。若 $\Phi_e(t,u)$ 为线性系统的状态转移算子，则

$$
X_e(T)=\int_0^T \Phi_e(T,u)b_e(u)\,du. \tag{4}
$$

### 3.1 土壤-径流-海水子系统

考虑 $L,R,W_s,W_d,\Omega$ 的子系统。设 $\ell_e$ 为局部固定率，$\rho_e$ 为土壤进入径流率，$\mu_e$ 为土壤直接矿化/深埋损失率，$\chi_e$ 为径流进入海洋混合层的率，$\zeta_e$ 为径流局部生物圈摄取率。则

$$
\dot X_{e,L}=b_{e,L}(t)-(\rho_e+\ell_e+\mu_e)X_{e,L}, \tag{5}
$$

$$
\dot X_{e,R}=b_{e,R}(t)+\rho_eX_{e,L}-(\chi_e+\zeta_e+\mu_{e,R})X_{e,R}, \tag{6}
$$

$$
\dot X_{e,W_s}=b_{e,W}(t)+\chi_eX_{e,R}-(a_e+\epsilon_e+s_e)X_{e,W_s}+\beta_eX_{e,W_d}, \tag{7}
$$

$$
\dot X_{e,W_d}=a_eX_{e,W_s}-(\beta_e+s_{e,d})X_{e,W_d}, \tag{8}
$$

$$
\dot X_{e,\Omega}^{(W)}=\mu_eX_{e,L}+\mu_{e,R}X_{e,R}+s_eX_{e,W_s}+s_{e,d}X_{e,W_d}. \tag{9}
$$

这里 $a_e$ 表示表层进入深海，$\beta_e$ 表示深海返混，$s_e,s_{e,d}$ 表示沉积损失，$\epsilon_e$ 表示由海水表层通过蒸发、气溶胶、挥发或碳氮交换返回大气/陆地循环的率。

海水循环造成的浪费概率定义为随机选取一个已进入海洋表层的孔子 $e$ 原子，到 $T$ 时刻仍未返回可摄取陆地/大气/生物入口的概率。令 $Y_s,Y_d,Y_\Omega$ 为从 $W_s(0)=1$ 出发的概率系统：

$$
\dot Y_s=-(a_e+\epsilon_e+s_e)Y_s+\beta_eY_d, \tag{10}
$$

$$
\dot Y_d=a_eY_s-(\beta_e+s_{e,d})Y_d, \tag{11}
$$

$$
\dot Y_\Omega=s_eY_s+s_{e,d}Y_d. \tag{12}
$$

则

$$
W_e(T)=Y_s(T)+Y_d(T)+Y_\Omega(T)=1-\epsilon_e\int_0^T Y_s(u)\,du. \tag{13}
$$

相应的海水返还概率为

$$
E_{e}^{O\to A}(T)=1-W_e(T)=\epsilon_e\int_0^T Y_s(u)\,du. \tag{14}
$$

如果 $a_e,\beta_e,s_e,s_{e,d},\epsilon_e$ 常数，则

$$
\begin{pmatrix}Y_s(T)\\Y_d(T)\end{pmatrix}
=\exp\left[
T\begin{pmatrix}
-(a_e+\epsilon_e+s_e)&\beta_e\\
a_e&-(\beta_e+s_{e,d})
\end{pmatrix}
\right]
\begin{pmatrix}1\\0\end{pmatrix}. \tag{15}
$$

### 3.2 大气分层模型

对大气循环，采用三层模型 $A_0,A_1,A_2$。$A_0$ 为边界层，$A_1$ 为对流层主体，$A_2$ 为平流层或高层大气。设垂直交换率为 $u_{01},u_{10},u_{12},u_{21}$，湿沉降/干沉降率为 $d_0,d_1,d_2$，化学转化或固定损失率为 $m_0,m_1,m_2$。则

$$
\frac{d}{dt}
\begin{pmatrix}
X_{e,A_0}\\X_{e,A_1}\\X_{e,A_2}
\end{pmatrix}
=A_e
\begin{pmatrix}
X_{e,A_0}\\X_{e,A_1}\\X_{e,A_2}
\end{pmatrix}
+
\begin{pmatrix}
J_{e,0}(t)\\J_{e,1}(t)\\J_{e,2}(t)
\end{pmatrix}, \tag{16}
$$

其中

$$
A_e=
\begin{pmatrix}
-(u_{01}+d_0+m_0)&u_{10}&0\\
u_{01}&-(u_{10}+u_{12}+d_1+m_1)&u_{21}\\
0&u_{12}&-(u_{21}+d_2+m_2)
\end{pmatrix}. \tag{17}
$$

源项包括尸体释放直接入气 $b_{e,A}(t)$、海水返还 $\epsilon_eX_{e,W_s}(t)$、土壤呼吸/挥发 $\theta_eX_{e,L}(t)$ 等：

$$
J_{e,0}(t)=b_{e,A}(t)+\epsilon_eX_{e,W_s}(t)+\theta_eX_{e,L}(t), \tag{18}
$$

$$
J_{e,1}(t)=0, \tag{19}
$$

$$
J_{e,2}(t)=0. \tag{20}
$$

从 $A_i$ 进入欧洲近地可摄取空气的概率记为 $\Gamma^{A\to EU}_{e,i}(T-u)$。则由大气通道贡献的欧洲入口质量为

$$
Z^A_{e,EU}(T)=\int_0^T\sum_{i=0}^2\Gamma^{A\to EU}_{e,i}(T-u)J_{e,i}(u)\,du. \tag{21}
$$

### 3.3 球面扩散核

为了显式写出孔子原子扩散函数，取地球表面为半径 $R_\oplus$ 的球面 $S^2_{R_\oplus}$。若某元素在给定库室内的水平扩散系数为 $D_e$，损失率为 $\kappa_e$，则表面浓度密度 $\rho_e(x,t)$ 满足

$$
\partial_t\rho_e(x,t)=D_e\Delta_{S^2}\rho_e(x,t)-\kappa_e\rho_e(x,t)+S_e(x,t), \tag{22}
$$

其中 $S_e$ 为源项。设源点为 $x_0$，球面距离夹角为 $\theta=d(x,x_0)/R_\oplus$，则 Green 函数为

$$
G_e(\theta,t)=\frac{e^{-\kappa_et}}{4\pi R_\oplus^2}
\sum_{\ell=0}^{\infty}(2\ell+1)P_\ell(\cos\theta)
\exp\left[-\frac{D_e\ell(\ell+1)}{R_\oplus^2}t\right]. \tag{23}
$$

因此

$$
\rho_e(x,T)=\int_0^T\int_{S^2}G_e(d(x,y)/R_\oplus,T-u)S_e(y,u)\,dA_y\,du. \tag{24}
$$

非均匀模态 $\ell \ge 1$ 的衰减因子为

$$
\exp\left[-\frac{D_e\ell(\ell+1)}{R_\oplus^2}t\right], \tag{25}
$$

故在混合时间

$$
\tau_{e,\ell}=\frac{R_\oplus^2}{D_e\ell(\ell+1)} \tag{26}
$$

之后，$\ell$ 阶非均匀项被压低。均匀模态给出全局混合近似

$$
\rho_e(x,T)\approx \frac{1}{4\pi R_\oplus^2}\int_0^T e^{-\kappa_e(T-u)}
\left(\int_{S^2}S_e(y,u)\,dA_y\right)du. \tag{27}
$$

## 4 可摄取混合库与马克思采样

令 $A$ 表示可摄取混合库，包括马克思可通过饮水、食物、空气和环境交换进入身体的有效库室。定义元素 $e$ 的孔子原子可摄取数为

$$
A_e(T)=\sum_{r\in A}X_{e,r}(T). \tag{28}
$$

设该元素在同一有效可摄取库中的总原子数为 $R_e(T)$。定义孔子 $e$ 原子的有效浓度

$$
\pi_e(T)=\frac{A_e(T)}{R_e(T)}. \tag{29}
$$

若马克思身体中第 $i$ 个元素 $e$ 原子从该库随机采样，则该原子来自孔子的概率为 $\pi_e(T)$。因此

$$
S_e(T)\sim \mathrm{Bin}(N_{M,e},\pi_e(T)),\qquad S(T)=\sum_{e\in E}S_e(T). \tag{30}
$$

当 $\pi_e(T)\ll 1$ 时，有泊松近似

$$
S(T)\approx \mathrm{Poisson}(\lambda(T)),\qquad
\lambda(T)=\sum_{e\in E}N_{M,e}\pi_e(T). \tag{31}
$$

严格地，独立采样给出

$$
P(S(T)=0)=\prod_{e\in E}(1-\pi_e(T))^{N_{M,e}}
\le \exp\left[-\sum_{e\in E}N_{M,e}\pi_e(T)\right]
=e^{-\lambda(T)}. \tag{32}
$$

故

$$
P(S(T)\ge 1)\ge 1-e^{-\lambda(T)}. \tag{33}
$$

## 5 有效留存率的分解

对每个元素 $e$，把 $A_e(T)$ 写成孔子元素总数与有效留存率的乘积：

$$
A_e(T)=N_{K,e}\eta_e(T). \tag{34}
$$

根据上文库室模型，$\eta_e(T)$ 可分解为

$$
\eta_e(T)=D_e(T)U_e(T)O_e(T)G^{\mathrm{atm}}_e(T)B_e(T)C_e(T), \tag{35}
$$

其中

$$
D_e(T)=\text{释放比例}, \tag{36}
$$

$$
U_e(T)=\text{释放后未被局部矿化/深埋锁定的比例}, \tag{37}
$$

$$
O_e(T)=\text{经过海水循环后未被浪费的比例}, \tag{38}
$$

$$
G^{\mathrm{atm}}_e(T)=\text{经过大气分层后进入目标大区的比例}, \tag{39}
$$

$$
B_e(T)=\text{进入可食物链/饮水/近地空气通道的比例}, \tag{40}
$$

$$
C_e(T)=\text{从可摄取库进入人体组成的条件比例}. \tag{41}
$$

在海洋子系统中，若某部分进入 $W_s$，则由式（14）可写

$$
O_e(T)=\epsilon_e\int_0^T Y_s(u)\,du,\qquad 1-O_e(T)=W_e(T). \tag{42}
$$

在大气三层模型中，若以 $A_0$ 为欧洲近地可摄取入口，则

$$
G^{\mathrm{atm}}_e(T)=
\frac{1}{J_{\mathrm{etot}}}
\int_0^T\sum_{i=0}^2\Gamma^{A\to EU}_{e,i}(T-u)J_{e,i}(u)\,du, \tag{43}
$$

其中

$$
J_{\mathrm{etot}}=\int_0^T\sum_{i=0}^2 J_{e,i}(u)\,du.
$$

## 6 主定理

选取一组主要可动元素 $E_0\subset E$，通常可取 $E_0=\{H,O,C,N\}$。记

$$
q_K^{(0)}=\sum_{e\in E_0}q_{K,e},\qquad
q_M^{(0)}=\sum_{e\in E_0}q_{M,e}. \tag{44}
$$

设对 $e\in E_0$ 有统一下界

$$
\eta_e(T)\ge \eta_0,\qquad R_e(T)\le R_{\mathrm{eff}}. \tag{45}
$$

定理 6.1（原子交的概率下界）。在独立稀采样模型（30）下，若（45）成立，则

$$
P(S(T)\ge 1)\ge 1-\exp\left[-\frac{\eta_0q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}\right]. \tag{46}
$$

特别地，若给定 $\varepsilon\in(0,1)$ 且

$$
\eta_0\ge \eta^*(\varepsilon):=
\frac{R_{\mathrm{eff}}}{q_K^{(0)}q_M^{(0)}N_KN_M}\log\frac{1}{\varepsilon}, \tag{47}
$$

则

$$
P(S(T)\ge 1)\ge 1-\varepsilon. \tag{48}
$$

证明。由（34）和（29），对 $e\in E_0$ 有

$$
\pi_e(T)=\frac{A_e(T)}{R_e(T)}
=\frac{N_{K,e}\eta_e(T)}{R_e(T)}
\ge \frac{q_{K,e}N_K\eta_0}{R_{\mathrm{eff}}}. \tag{49}
$$

故

$$
\lambda(T)=\sum_{e\in E}N_{M,e}\pi_e(T) \tag{50}
$$

$$
\ge \sum_{e\in E_0} q_{M,e}N_M\frac{q_{K,e}N_K\eta_0}{R_{\mathrm{eff}}}. \tag{51}
$$

若 $E_0$ 内部孔子与马克思的元素比例近似同阶，使用粗下界

$$
\sum_{e\in E_0}q_{M,e}q_{K,e}\ge q_K^{(0)}q_M^{(0)}\gamma_0, \tag{52}
$$

其中 $\gamma_0\in(0,1]$ 表示元素比例重叠因子。若为简化将 $R_{\mathrm{eff}}$ 吸收为元素混合后的总有效库，取 $\gamma_0=1$ 的合并元素模型，则

$$
\lambda(T)\ge \frac{\eta_0q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}. \tag{53}
$$

代入（33）得（46）。若（47）成立，则指数项不超过 $\varepsilon$，从而（48）成立。

注 6.1。若保留元素比例重叠因子 $\gamma_0$，只需将所有公式中的 $q_K^{(0)}q_M^{(0)}$ 替换为 $\gamma_0q_K^{(0)}q_M^{(0)}$。这不改变数量级结论。

## 7 带海水浪费与大气分层的下界

设对 $e\in E_0$ 有参数下界

$$
D_e(T)\ge d_*,\qquad U_e(T)\ge u_*,\qquad O_e(T)\ge o_*, \tag{54}
$$

$$
G^{\mathrm{atm}}_e(T)\ge g_*,\qquad B_e(T)\ge b_*,\qquad C_e(T)\ge c_*. \tag{55}
$$

由（35），

$$
\eta_e(T)\ge d_*u_*o_*g_*b_*c_* =: \eta^*_{\mathrm{model}}. \tag{56}
$$

代入主定理得到

$$
P(S(T)\ge 1)\ge
1-\exp\left[
-\frac{d_*u_*o_*g_*b_*c_*q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}
\right]. \tag{57}
$$

命题 7.1（海洋浪费项的显式界）。设 $Y_s,Y_d$ 满足（15），并设 $a_e,\beta_e,s_e,s_{e,d},\epsilon_e\ge 0$。若 $T\gg(a_e+\epsilon_e+s_e+\beta_e+s_{e,d})^{-1}$，则存在常数 $C_e>0$ 使

$$
O_e(T)=\epsilon_e\int_0^T Y_s(u)\,du
\ge \epsilon_e\int_0^\infty Y_s(u)\,du-C_ee^{-\nu_eT}, \tag{58}
$$

其中 $\nu_e$ 为矩阵（15）的最小正衰减率。且

$$
\int_0^\infty Y_s(u)\,du =
\frac{\beta_e+s_{e,d}}{(a_e+\epsilon_e+s_e)(\beta_e+s_{e,d})-a_e\beta_e}. \tag{59}
$$

证明。令

$$
M_e=
\begin{pmatrix}
-(a_e+\epsilon_e+s_e)&\beta_e\\
a_e&-(\beta_e+s_{e,d})
\end{pmatrix}.
$$

则

$$
\int_0^\infty e^{M_eu}\,du=-M_e^{-1}
$$

只要所有损失/返还率使特征值实部为负。于是

$$
\int_0^\infty Y_s(u)\,du=(1,0)(-M_e^{-1})(1,0)^\top.
$$

直接求逆即得（59）。有限 $T$ 下尾项由矩阵指数范数

$$
\int_T^\infty e^{M_eu}\,du\le C_ee^{-\nu_eT}
$$

控制。

命题 7.2（大气分层返还项）。设 $A_e$ 为（17），其谱满足 $\Re\lambda_j(A_e)<0$。若源项集中于 $A_0$，即 $J_e(t)=(J_e(t),0,0)^\top$，且欧洲近地摄取函数对 $A_0$ 满足 $\Gamma^{A\to EU}_{e,0}(s)\ge \gamma_e(s)$，则

$$
G^{\mathrm{atm}}_e(T)\ge
\frac{
\int_0^T\int_u^T
\gamma_e(T-v)(1,0,0)e^{A_e(v-u)}(1,0,0)^\top J_e(u)\,dv\,du
}{
\int_0^T J_e(u)\,du
}. \tag{60}
$$

若进一步 $\gamma_e(s)\ge \bar\gamma_e\mathbf{1}_{s\ge \tau_e}$，则

$$
G^{\mathrm{atm}}_e(T)\ge
\bar\gamma_e
\frac{
\int_0^{T-\tau_e}\int_{u+\tau_e}^T
(1,0,0)e^{A_e(v-u)}(1,0,0)^\top J_e(u)\,dv\,du
}{
\int_0^T J_e(u)\,du
}. \tag{61}
$$

证明。由线性系统解

$$
A_e(v)=\int_0^v e^{A_e(v-u)}(J_e(u),0,0)^\top\,du.
$$

欧洲近地摄取贡献至少为 $\Gamma_{e,0}$ 作用在 $A_0$ 分量上。代入并交换积分次序得到（60）。再用 $\gamma_e(s)\ge \bar\gamma_e\mathbf{1}_{s\ge \tau_e}$ 得（61）。

## 8 数量级计算

取

$$
N_K=N_M=7\times10^{27},\qquad R_{\mathrm{eff}}=10^{47},\qquad q_K^{(0)}q_M^{(0)}=0.64. \tag{62}
$$

则

$$
\frac{q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}
=0.64\times\frac{49\times10^{54}}{10^{47}}
=3.136\times10^8. \tag{63}
$$

故

$$
\lambda\ge 3.136\times10^8\eta_0. \tag{64}
$$

阈值为

$$
\eta^*(\varepsilon)=\frac{\log(1/\varepsilon)}{3.136\times10^8}. \tag{65}
$$

| 目标概率 | $\varepsilon$ | 所需 $\eta^*(\varepsilon)$ |
| --- | ---: | ---: |
| $0.90$ | $10^{-1}$ | $7.34\times10^{-9}$ |
| $0.99$ | $10^{-2}$ | $1.47\times10^{-8}$ |
| $0.999999$ | $10^{-6}$ | $4.41\times10^{-8}$ |
| $1-10^{-12}$ | $10^{-12}$ | $8.81\times10^{-8}$ |

考虑带损失的保守乘法模型。令

$$
(d_*,u_*,o_*,g_*,b_*,c_*)=(10^{-1},10^{-2},10^{-1},10^{-2},10^{-1},10^{-1}). \tag{66}
$$

则

$$
\eta^*_{\mathrm{model}}=10^{-8}. \tag{67}
$$

因此

$$
\lambda\ge 3.136,\qquad P(S\ge 1)\ge 1-e^{-3.136}\approx 0.9566. \tag{68}
$$

若只将其中一个因子提高一个数量级，例如 $u_*=10^{-1}$，则

$$
\eta^*_{\mathrm{model}}=10^{-7},\qquad
\lambda\ge 31.36,\qquad
P(S\ge 1)\ge 1-e^{-31.36}>1-2.4\times10^{-14}. \tag{69}
$$

若取更保守的整个地球有效库

$$
R_{\mathrm{eff}}=10^{50}, \tag{70}
$$

则

$$
\frac{q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}=3.136\times10^5. \tag{71}
$$

在此情形下

$$
\eta^*(10^{-6})=\frac{13.8155}{3.136\times10^5}\approx 4.41\times10^{-5}. \tag{72}
$$

即使采用整个地球作为混合库，只要有效留存率达到 $10^{-4}$ 量级，仍可得到 $1-10^{-6}$ 级别的命中概率。若采用表层混合库 $R_{\mathrm{eff}}=10^{47}$，阈值降至 $10^{-8}$ 量级。

## 9 非空交集的严格结论

推论 9.1（孔子-马克思原子交）。设 $E_0=\{H,O,C,N\}$，且满足

$$
\prod_{F\in\{D,U,O,G^{\mathrm{atm}},B,C\}}F_*(T)
\ge
\frac{R_{\mathrm{eff}}}{q_K^{(0)}q_M^{(0)}N_KN_M}
\log\frac{1}{\varepsilon}. \tag{73}
$$

则

$$
P(K\sim_1M(T))=P(|K\cap M(T)|\ge 1)\ge 1-\varepsilon. \tag{74}
$$

在参数（62）下，若有效留存率不低于 $4.41\times10^{-8}$，则

$$
P(|K\cap M(T)|\ge 1)\ge 1-10^{-6}. \tag{75}
$$

证明。将（56）代入定理（46）即得。

## 10 矩阵形式的最终表达

令所有元素与库室合并为大状态向量

$$
X(t)=(X_e(t))_{e\in E}
$$

和分块对角生成元

$$
Q(t)=\mathrm{diag}(Q_e(t))_{e\in E}.
$$

令释放源为

$$
b(t)=(N_{K,e}\delta_e(t)v_e)_{e\in E}.
$$

则

$$
X(T)=\int_0^T\Phi(T,u)b(u)\,du,\qquad
\Phi(T,u)=\mathcal{T}\exp\left(\int_u^TQ(s)\,ds\right), \tag{76}
$$

其中 $\mathcal{T}$ 为时间排序算子。令 $P_A$ 为投影到可摄取库的矩阵，$R_e(T)$ 为对应背景库规模，则

$$
\lambda(T)=\sum_{e\in E}N_{M,e}
\frac{
\left[P_A\int_0^T\Phi_e(T,u)N_{K,e}\delta_e(u)v_e\,du\right]_e
}{R_e(T)}. \tag{77}
$$

最终概率为

$$
P(|K\cap M(T)|\ge 1)\ge 1-\exp[-\lambda(T)], \tag{78}
$$

其中 $\lambda(T)$ 由（77）给出。若使用元素合并、有效库合并和统一下界，则退化为

$$
P(|K\cap M(T)|\ge 1)\ge
1-\exp\left[
-\frac{\eta_0q_K^{(0)}q_M^{(0)}N_KN_M}{R_{\mathrm{eff}}}
\right]. \tag{79}
$$

这就是本文所需的纯数学判据。
