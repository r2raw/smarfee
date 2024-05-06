PGDMP     &        
            |            smarfee    15.4    15.4 1    <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16398    smarfee    DATABASE     �   CREATE DATABASE smarfee WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.949';
    DROP DATABASE smarfee;
                postgres    false            �            1259    16541    operationday    TABLE     �   CREATE TABLE public.operationday (
    id integer NOT NULL,
    storeid character varying(50),
    day character varying(50),
    openingtime time without time zone,
    closingtime time without time zone
);
     DROP TABLE public.operationday;
       public         heap    postgres    false            �            1259    16540    operationday_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operationday_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.operationday_id_seq;
       public          postgres    false    219            @           0    0    operationday_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.operationday_id_seq OWNED BY public.operationday.id;
          public          postgres    false    218            �            1259    16915    orders    TABLE     3  CREATE TABLE public.orders (
    id integer NOT NULL,
    store_id character varying(50),
    product_id integer,
    user_id character varying(50),
    order_number character varying(50),
    product_quantity numeric(10,0),
    amount_payable numeric(10,2),
    entered_amount numeric(10,2),
    change numeric(10,2),
    order_type character varying(50),
    payment_type character varying(50),
    service_type character varying(50),
    status character varying(50),
    paid boolean,
    date_ordered timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16914    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    224            A           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    223            �            1259    16567    rejectedapplication    TABLE     s   CREATE TABLE public.rejectedapplication (
    id character varying NOT NULL,
    comment character varying(500)
);
 '   DROP TABLE public.rejectedapplication;
       public         heap    postgres    false            �            1259    16528 	   storeinfo    TABLE     ?  CREATE TABLE public.storeinfo (
    id character varying(50) NOT NULL,
    storeimg text,
    name character varying(250),
    email character varying(250),
    phone numeric(10,0),
    dti text,
    clearance text,
    permit text,
    valid_id text,
    approvalstatus character varying(50),
    dateapproved date
);
    DROP TABLE public.storeinfo;
       public         heap    postgres    false            �            1259    16553    storeproducts    TABLE     �  CREATE TABLE public.storeproducts (
    id integer NOT NULL,
    storeid character varying(50),
    productcode character varying(50),
    productname character varying(250),
    productprice numeric(10,2),
    category character varying(50),
    type character varying(50),
    size character varying(50),
    availability character varying(50),
    productimg text,
    dateadded timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.storeproducts;
       public         heap    postgres    false            �            1259    16552    storeproducts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.storeproducts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.storeproducts_id_seq;
       public          postgres    false    221            B           0    0    storeproducts_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.storeproducts_id_seq OWNED BY public.storeproducts.id;
          public          postgres    false    220            �            1259    16497    useracc    TABLE     �   CREATE TABLE public.useracc (
    id character varying(50) NOT NULL,
    email character varying(250),
    password character varying(250),
    status character varying(250),
    role character varying(50),
    datecreated timestamp without time zone
);
    DROP TABLE public.useracc;
       public         heap    postgres    false            �            1259    16516    userprofile    TABLE     �   CREATE TABLE public.userprofile (
    id character varying(50) NOT NULL,
    firstname character varying(250),
    lastname character varying(250),
    birthdate date,
    phone numeric(10,0),
    sex character varying(50),
    img text
);
    DROP TABLE public.userprofile;
       public         heap    postgres    false            �            1259    16504    vendorprofile    TABLE       CREATE TABLE public.vendorprofile (
    id character varying(50) NOT NULL,
    firstname character varying(250),
    lastname character varying(250),
    birthdate date,
    userid character varying(50),
    phone numeric(10,0),
    sex character varying(50),
    img text
);
 !   DROP TABLE public.vendorprofile;
       public         heap    postgres    false            �           2604    16544    operationday id    DEFAULT     r   ALTER TABLE ONLY public.operationday ALTER COLUMN id SET DEFAULT nextval('public.operationday_id_seq'::regclass);
 >   ALTER TABLE public.operationday ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    16918 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16556    storeproducts id    DEFAULT     t   ALTER TABLE ONLY public.storeproducts ALTER COLUMN id SET DEFAULT nextval('public.storeproducts_id_seq'::regclass);
 ?   ALTER TABLE public.storeproducts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            4          0    16541    operationday 
   TABLE DATA           R   COPY public.operationday (id, storeid, day, openingtime, closingtime) FROM stdin;
    public          postgres    false    219   �>       9          0    16915    orders 
   TABLE DATA           �   COPY public.orders (id, store_id, product_id, user_id, order_number, product_quantity, amount_payable, entered_amount, change, order_type, payment_type, service_type, status, paid, date_ordered) FROM stdin;
    public          postgres    false    224   |?       7          0    16567    rejectedapplication 
   TABLE DATA           :   COPY public.rejectedapplication (id, comment) FROM stdin;
    public          postgres    false    222   DA       2          0    16528 	   storeinfo 
   TABLE DATA           �   COPY public.storeinfo (id, storeimg, name, email, phone, dti, clearance, permit, valid_id, approvalstatus, dateapproved) FROM stdin;
    public          postgres    false    217   pA       6          0    16553    storeproducts 
   TABLE DATA           �   COPY public.storeproducts (id, storeid, productcode, productname, productprice, category, type, size, availability, productimg, dateadded) FROM stdin;
    public          postgres    false    221   �B       /          0    16497    useracc 
   TABLE DATA           Q   COPY public.useracc (id, email, password, status, role, datecreated) FROM stdin;
    public          postgres    false    214   YE       1          0    16516    userprofile 
   TABLE DATA           Z   COPY public.userprofile (id, firstname, lastname, birthdate, phone, sex, img) FROM stdin;
    public          postgres    false    216   �I       0          0    16504    vendorprofile 
   TABLE DATA           d   COPY public.vendorprofile (id, firstname, lastname, birthdate, userid, phone, sex, img) FROM stdin;
    public          postgres    false    215   �I       C           0    0    operationday_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.operationday_id_seq', 11, true);
          public          postgres    false    218            D           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 22, true);
          public          postgres    false    223            E           0    0    storeproducts_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.storeproducts_id_seq', 11, true);
          public          postgres    false    220            �           2606    16546    operationday operationday_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.operationday
    ADD CONSTRAINT operationday_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.operationday DROP CONSTRAINT operationday_pkey;
       public            postgres    false    219            �           2606    16921    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    224            �           2606    16573 ,   rejectedapplication rejectedapplication_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.rejectedapplication
    ADD CONSTRAINT rejectedapplication_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.rejectedapplication DROP CONSTRAINT rejectedapplication_pkey;
       public            postgres    false    222            �           2606    16534    storeinfo storeinfo_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.storeinfo
    ADD CONSTRAINT storeinfo_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.storeinfo DROP CONSTRAINT storeinfo_pkey;
       public            postgres    false    217            �           2606    16561     storeproducts storeproducts_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.storeproducts
    ADD CONSTRAINT storeproducts_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.storeproducts DROP CONSTRAINT storeproducts_pkey;
       public            postgres    false    221            �           2606    16503    useracc useracc_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.useracc
    ADD CONSTRAINT useracc_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.useracc DROP CONSTRAINT useracc_pkey;
       public            postgres    false    214            �           2606    16522    userprofile userprofile_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.userprofile
    ADD CONSTRAINT userprofile_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.userprofile DROP CONSTRAINT userprofile_pkey;
       public            postgres    false    216            �           2606    16510     vendorprofile vendorprofile_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vendorprofile
    ADD CONSTRAINT vendorprofile_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vendorprofile DROP CONSTRAINT vendorprofile_pkey;
       public            postgres    false    215            �           2606    16547 &   operationday operationday_storeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.operationday
    ADD CONSTRAINT operationday_storeid_fkey FOREIGN KEY (storeid) REFERENCES public.storeinfo(id);
 P   ALTER TABLE ONLY public.operationday DROP CONSTRAINT operationday_storeid_fkey;
       public          postgres    false    3215    217    219            �           2606    16927    orders orders_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.storeproducts(id);
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_product_id_fkey;
       public          postgres    false    221    3219    224            �           2606    16922    orders orders_store_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.storeinfo(id);
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_store_id_fkey;
       public          postgres    false    217    224    3215            �           2606    16932    orders orders_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.useracc(id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    214    3209    224            �           2606    16574 /   rejectedapplication rejectedapplication_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.rejectedapplication
    ADD CONSTRAINT rejectedapplication_id_fkey FOREIGN KEY (id) REFERENCES public.storeinfo(id);
 Y   ALTER TABLE ONLY public.rejectedapplication DROP CONSTRAINT rejectedapplication_id_fkey;
       public          postgres    false    217    222    3215            �           2606    16535    storeinfo storeinfo_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.storeinfo
    ADD CONSTRAINT storeinfo_id_fkey FOREIGN KEY (id) REFERENCES public.vendorprofile(id);
 E   ALTER TABLE ONLY public.storeinfo DROP CONSTRAINT storeinfo_id_fkey;
       public          postgres    false    3211    215    217            �           2606    16562 (   storeproducts storeproducts_storeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.storeproducts
    ADD CONSTRAINT storeproducts_storeid_fkey FOREIGN KEY (storeid) REFERENCES public.storeinfo(id);
 R   ALTER TABLE ONLY public.storeproducts DROP CONSTRAINT storeproducts_storeid_fkey;
       public          postgres    false    217    221    3215            �           2606    16523    userprofile userprofile_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.userprofile
    ADD CONSTRAINT userprofile_id_fkey FOREIGN KEY (id) REFERENCES public.useracc(id);
 I   ALTER TABLE ONLY public.userprofile DROP CONSTRAINT userprofile_id_fkey;
       public          postgres    false    216    214    3209            �           2606    16511 '   vendorprofile vendorprofile_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorprofile
    ADD CONSTRAINT vendorprofile_userid_fkey FOREIGN KEY (userid) REFERENCES public.useracc(id);
 Q   ALTER TABLE ONLY public.vendorprofile DROP CONSTRAINT vendorprofile_userid_fkey;
       public          postgres    false    215    3209    214            4   �   x�3�400����KI��40�20 "Nc��,�QZT�]�1P��~(��,����Z�]�)XEp)̀�&���%�E`�0&P�`�eb�o�6�)�Zo��2�,!�pb(04 ���S�,���	z ��qqq Mr      9   �  x��ֽr�0�Z���5��~H�I�H��S��8\ƃ��$�=Wp�ٿV�!�3GS�}Ά{);��x<�#G�=|�����w��<5���|9>w}yr�v?Js|������7��ߡܡ6H-j�왈1 �h8��sC5Z�8�鼺!�#*���":��Ӛ��>m�"r�ϖsEe%_�0��d�Z��.T�%��/�w%i#{��T��xϙ�;�̦�N��
e3�s���D�PK���mP�Phj��7j^����0	Zɗ�)uFU9A�+�n��jQ����wcUI��M���dDte<�F�aR�l@�m��'G'�E�c��Q�?5�?=���]�B����P�~Bc��ޑ�2_Q�Ek���+���v�� �`~Y�3:�:Z.��5^��ZZ=i"Qiڼ��S��qM֞�o�X���`��< ���=      7      x�300�L,NI,�200��b���� D�9      2   i  x���;o�0�g�����q���k��j:f!�EI	����}]n$�����w�9��K��*T��6Y��U�bOm�TE�jI}��G��M~W�]�l�Cd�`�Zz��2۾m�ֹ쪂ܰۤ�_�ԩy:5��o�c�a��$�:`/P`�g�	Y�f&�gg��;�k]�K��4��=۽ݶ.���e�Pk�%}x/��k�%���9��S��!�W)��@0(����(��I����fz*��[Sg��V�{�5��Ġv�&*E��y�Y�u�{�z�~ʰ����0h@��,��U����b6��n!�
D������Fju����������]淪eꩅMxJ�U����u��Y[�~      6   `  x����n�0E��Wp����]R5��:M��d�PT��a�E?��#��A���#�{����.�x__����]X.kJH�.�vY�l�մ\�~��W��韲���i``��R�!(��W��tV5��U�w,�~�Q>ůy�P"�R�8@�*�(��2&Q`�G}��k���i� #�3����Y��� �'�ҧ�$n���CۆŲ�'<_�ͤe�٢�����0����>��F'%����_���.����i&�>C'$e)�Р��sW�'��룩�p�6�ǁ����gם�N*O(�y��C���R̛{J�q��@2�iRH��"(vV��_OJR��7���*�>p`�g�f
��g��/��y���(�#
f��A��O�����������V1�������|Q�糱��|��^��.����~ݻ��8�vb��%����;t�;�8Q�I2��]f$ab��' #�tѫ�y̫�j��N*���/��Fi Od$QA�t��zi�u��h���%5\��Z�.!ؐn"�o��vF���W�C��ѥ���W�HV�8&��@|��5a�) �k�M���N~�$I���l      /   K  x���I��H���>��1 O#�B�.1EAY�_?VU�D[�tUDNO��-HU	�eFy�� K���r~��P�Y"	 ����0�$n�D�'T~J�T������-N�K	'J��*��=KT�(2wF�!��v!��~�[]/K7�~���ṅ �~��Q �y; \�a�@�h]�$��@bKRF,뭔�mpjKZ�Ecxv�z�w'q}8h;���˶�������d���@K�v����E����[>�4��Yl*��dpd�nG���E��y�*l��⬰$��˖;ƶ����o�^q�d�1��qB�w�+1����1G���r.����l�b��X�%ڧ�:��b���W$��ku��R��s�K���yLƕ8��c�r�^��h�6,���V�N���&�e;I��v�n;͈��4E6�~�#u�*|x)���I�H�.zq��f]��7v����g�Ao�fp܍�����&�-�펓�[ܑe�C8��#=s �f�ZW�Ka6�S[純D�$�Y�T�e�R���������N.��7ӑ���0�.S	�e����̉s1%����&���r�N��,'K��;��u,�w�8�:�m����B~�l�v0>X��<c��b���
X���x>���f�*s\ Ys�Vd��e�s�_c��Q��Ϙ���^O�Y�Ӷ�Ȍe{�(���Tz�u��4sf��_"�ሮ�o``����Q�1L7$�����^B�F^�]�u�{%��j��Q�?.:1�V�:���X�`yhp
�1sm3j�v��O��v`�]��h|p��º[EV1ƃ�����5������p��܀�
d��}����1�^�n�d����FcU,m�����U����\����j��}h�O�R;�
�'KH񘇨�л�a�qZ5y�΋���tݛ��h�e��<��t�Y8��:�ǋ��_��N���ʀv�"(˞$C�Sp����c6=6v���jyn��N�;�ˠ���2��Xg����)f���I�Q(��=�W��� ��z2��-�ʬ\�^7k�ݩ)�zk��~/�8��8�/Y8*$�+�}���ߢ � .�n      1      x������ � �      0   �   x����j�0 ��..��d��`���.I���/�^��c����|���ж����yl[�R�O��eZ���4��I8#j/~���ڞ��Cfa��9I�x�z�����?!@��F\�H�ྡ��U2YJ�.��mm5�_��΄�N[�$�y�Ʉ(8��5B��P"�k�hv!�-"�Ȝ�b�T��c=\C\�1f5���Jn"T�Wc�>��7�"��[L���Ϋz���
g�     